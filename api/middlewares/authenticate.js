const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

const authenticate = (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message:"No token"});
    }

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.employee = decodedToken;
        next()
    } catch (error){
        res.status(401).json({message:"Token incorrect"});
    }
}

const authorize = (roles) => (req, res, next) => {
    if(!roles.includes(req.employee.role_id)){
        return res.status(403).json({message:"Access denied"});
    }
    next()
}

module.exports = { authenticate, authorize }