require('dotenv').config();

const config = {
    port: Number(process.env.PORT) || 4000,
    mongoDbUri:
        process.env.MONGODB_URI ||
        'mongodb://localhost:27017/tractor-depot-inc',
    jwtSecret: process.env.JWT_SECRET || 'secret',
};

module.exports = config;
