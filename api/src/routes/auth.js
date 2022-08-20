const { Router } = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const authRouter = Router();

authRouter.post('/login', authController.login);

authRouter.post('/validate', authController.validate);

authRouter.get('/secret', authMiddleware, (req, res) => {
    return res.status(200).json({
        message: 'Secret',
    });
});

module.exports = authRouter;
