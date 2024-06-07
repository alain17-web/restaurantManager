const authService = require('../services/auth.service');
const authValidator = require('../validators/authValidator');

const authController = {
    login : async (req, res) => {
        try {
            await authValidator.validate(req.body);

            const {username, password} = req.body;
            const {token, employee} = await authService.login({username, password});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            let redirectUrl = null;
            if (employee.role_id === 1) {
                redirectUrl = 'http://localhost:5173/dashboard';
            }

            res.json({message: 'Login successful', employee});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({message: error.message});
            }
            res.status(401).json({message: error.message});
        }
    }
}
module.exports = authController;
