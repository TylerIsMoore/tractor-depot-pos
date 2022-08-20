const mongoose = require('mongoose');
const config = require('./config');

const db = () => {
    return new Promise((res, rej) => {
        mongoose.connect(config.mongoDbUri, (err) => {
            if (err) return rej(err);
            console.log(`Connected to ${config.mongoDbUri}`);

            res();
        });
    });
};

module.exports = db;
