const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const authRouter = require('./auth');
const productsRouter = require('./products');

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', authMiddleware, productsRouter);

module.exports = mainRouter;
