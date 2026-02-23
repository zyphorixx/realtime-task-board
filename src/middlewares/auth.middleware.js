const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const { UnauthorizedError } = require('../utils/errors');

function authenticate(req, res, next){
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            throw new UnauthorizedError('Authorization header missing');
        }

        const token = authHeader.split(' ')[1]; // Bearer <token>

        if (!token) {
            throw new UnauthorizedError('Token not provided');
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            id : decoded.userId
        };

        next();
    } 
    catch (error) {
        if (error instanceof UnauthorizedError) {
            return next(error);
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new UnauthorizedError('Invalid token'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new UnauthorizedError('Token expired'));
        }
        return next(new UnauthorizedError('Authentication failed'));
    }
}

module.exports = authenticate;
