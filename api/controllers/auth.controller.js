// Import the authentication service that handles the logic for login and logout
const authService = require('../services/auth.service');

// Import the authentication validator to validate the request body
const authValidator = require('../validators/authValidator');

// Define the authController object to handle authentication-related requests
const authController = {
    //LOGIN
    login : async (req, res) => {
        try {
            // Validate the request body (username and password) using the validator
            await authValidator.validate(req.body);

            // Destructure the username and password from the request body
            const {username, password} = req.body;

            // Call the login service function with the username and password
            const {token, employee} = await authService.login({username, password});

            // Set a cookie in the response with the JWT token
            // The cookie is HTTP-only for security (not accessible via JavaScript)
            // If in production mode, the cookie is set with the `secure` flag (only sent over HTTPS)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            // Respond with a success message, along with the employee data and token
            res.json({message: 'Login successful', employee,token});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({message: error.message});
            }
            res.status(401).json({message: error.message});
        }
    },

    //LOGOUT
    logout :  (req, res) => {
        // Call the logout service (in this case, it just returns a success message)
        authService.logout();

        // Clear the token cookie from the client's browser
        res.clearCookie('token');
        res.json({message: 'Déconnecté'});
    }
}
module.exports = authController;
