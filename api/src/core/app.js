const express = require('express');
const cors = require('cors');
const mainRouter = require('../routes');
const db = require('./db');

const app = async () => {
    await db();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        cors({
            origin: 'http://127.0.0.1:5173',
        })
    );

    app.use('/api', mainRouter);

    app.use('*', (req, res) => {
        return res.status(404).json({
            message: 'Not found',
        });
    });

    return app;
};

module.exports = app;
