const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const moment = require('moment');
const tokenService = require('../services/token.service');
const ApiError = require('../utils/ApiError');

const generateSalt = async () => {
    const saltRound = 8;
    const salt = await bcrypt.genSalt(saltRound);
    return salt;
}

const generateOtp = () => {
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000);
    return `${sixDigitCode}`;
};

const generateHashPassword = async (password) => {
    const salt = await generateSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const verifyPassword = async (user, password) => {
    const encryptedPassword = user?.password;
    return await bcrypt.compare(password, encryptedPassword)
}

const userExists = async (email) => {
    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, 'User not found with this email');
    return user;
}

const loginUser = async (body) => {
    const { email, password } = body;
    const expireInMinutes = process.env.JWT_ACCESS_EXPIRATION_MINUTES;
    const expiresIn = moment().add(expireInMinutes, 'minutes');
    const user = await userExists(email);
    const isPasswordMatch = await verifyPassword(user, password);
    if (!isPasswordMatch) throw new ApiError(400, 'Invaid email or password');
    const token = tokenService.generateToken(user?.id, expiresIn, 'access');
    return {
        token,
        user,
        expireInMinutes
    }
}

const loggedInUser = (token) => {
    const decodedUser = tokenService.verifyToken(token);
    return decodedUser?.sub;
}

module.exports = {
    loginUser,
    userExists,
    generateOtp,
    verifyPassword,
    loggedInUser,
    generateHashPassword
}