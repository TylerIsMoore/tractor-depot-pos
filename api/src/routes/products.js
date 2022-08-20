const { Router } = require('express');
const productsController = require('../controllers/products');

const productsRouter = Router();

productsRouter.post('/search', productsController.search);

module.exports = productsRouter;
