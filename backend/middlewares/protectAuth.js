const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectAuth = async (req, res, next) => {
    try {
        const headers = req?.headers;
        const token = headers?.authorization ? headers?.authorization?.split(' ')[1] : null;
        if (!token) return res.status(400).json({
            status: 400,
            message: 'Bearer Token is required'
        })
        const decoded = jwt.decode(token);
        const user = await User.findById(decoded?.sub);
        req.user = user;
        next()
    } catch (error) {
        console.log(error, 'error')
    }
};

module.exports = {
    protectAuth
}