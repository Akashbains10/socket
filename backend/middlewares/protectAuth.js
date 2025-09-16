const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(400).json({
                status: 400,
                message: 'Token is required in cookies'
            });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.sub);
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'User not found'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({
            status: 401,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = {
    protectAuth
};