const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../core/config');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const bearerToken = req.headers['authorization'];
        ('Bearer ');
        const token = bearerToken.split(' ')[1];

        jwt.verify(token, config.jwtSecret);

        next();
    } catch (err) {
        return res.status(401).json({
            message: err.message,
        });
    }
};

module.exports = authMiddleware;
