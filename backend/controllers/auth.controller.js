const User = require("../models/user.model");
const {
    generateHashPassword,
    loginUser,
    loggedInUser
} = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");

const registerUser = async (req, res) => {
    try {
        const { email } = req.body;
        const isExist = await User.findOne({ email })
        if (isExist) throw new Error('User already exists')
        const user = await User.create({
            ...req.body,
            password: await generateHashPassword(req.body.password)
        });
        return res.status(200).json({
            status: 200,
            message: 'User registered successfully',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error?.message ?? 'Internal Server Error',
            error: error?.stack
        })
    }
};

const login = catchAsync(async (req, res) => {
    const { token, user, expireInMinutes } = await loginUser(req.body);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: expireInMinutes * 60 * 1000, // convert minutes into milliseconds
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return res.status(200).json({
        status: 200,
        message: 'Logged in successfully',
        data: user
    })
});

const me = catchAsync(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Token must be provided'
        })
    }
    const userId = loggedInUser(token);
    const user = await User.findById(userId);
    return res.status(200).json({
        status: 200,
        message: 'User details fetched successfully',
        data: user
    })
})

const logout = catchAsync(async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    return res.status(200).json({
        status: 200,
        message: 'Logged out successfully'
    });
})

module.exports = {
    registerUser,
    login,
    logout,
    me
}