const express = require('express');
const EmployeeModel = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../core/config');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        const employee = await EmployeeModel.findOne({
            employeeId,
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            employee.password
        );

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        const identPayload = {
            employeeId: employee.employeeId,
            name: employee.name,
            role: employee.role,
        };

        // Come back to and add refresh tokens
        const accessToken = jwt.sign(identPayload, config.jwtSecret, {
            expiresIn: '15m',
        });

        return res.status(200).json({
            accessToken,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const validate = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const bearerToken = req.headers['authorization'];

        const token = bearerToken.split(' ')[1];

        const identPayload = jwt.verify(token, config.jwtSecret);

        return res.status(200).json({
            message: 'Token is valid',
            identPayload,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const authController = {
    login,
    validate,
};

module.exports = authController;
