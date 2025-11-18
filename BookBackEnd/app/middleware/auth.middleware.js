const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        return res.status(403).json({ message: 'Invalid token' });
    }
}

exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
}