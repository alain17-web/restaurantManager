// Import the jsonwebtoken library to verify and decode JWT tokens
const jwt = require("jsonwebtoken");

// Destructure the JWT secret and expiration time from environment variables
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

// Middleware to authenticate users based on the JWT token
const authenticate = (req, res, next) => {
    // Try to retrieve the token from cookies first
    let token = req.cookies.token;

    // If the token is not in cookies, check the Authorization header (Bearer token)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Extract the token from the Bearer header
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message:"No token"});
    }

    try{
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, JWT_SECRET);
        // Attach the decoded token (which contains user info) to the request object
        req.employee = decodedToken;

        // Move to the next middleware or route handler
        next()
    } catch (error){
        res.status(401).json({message:"Token incorrect"});
    }
}

// Middleware to authorize users based on their roles
// `roles` is an array of role IDs that are allowed to access the route
const authorize = (roles) => (req, res, next) => {
    // Check if the user's role (from the decoded token) is included in the allowed roles
    if(!roles.includes(req.employee.role_id)){
        // If the user's role is not allowed, respond with a 403 Forbidden error
        return res.status(403).json({message:"Access denied"});
    }
    // If the user's role is authorized, move to the next middleware or route handler
    next()
}

module.exports = { authenticate, authorize }