const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Pas de token"});
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
        return res.status(403).json({message:"Accès refusé"});
    }
    next()
}

module.exports = { authenticate, authorize }