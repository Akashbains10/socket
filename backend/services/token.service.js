const jwt = require('jsonwebtoken');
const moment = require('moment');

const secret = process.env.JWT_SECRET;

const generateToken = (userId, expiresIn, type) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expiresIn.unix(),
        type
    }
    return jwt.sign(payload, secret)
}

const verifyToken = (token) => {
    const decode = jwt.verify(token, secret);
    return decode;
}


module.exports = {
    generateToken,
    verifyToken
}