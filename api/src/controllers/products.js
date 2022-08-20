const express = require('express');
const ProductModel = require('../models/Product');
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns
 */
const search = async (req, res) => {
    try {
        const { sku } = req.body;

        const product = await ProductModel.findOne({
            sku,
        }).lean();

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        const { price, description } = product;

        return res.status(200).json({
            price,
            description,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const productsController = {
    search,
};

module.exports = productsController;
