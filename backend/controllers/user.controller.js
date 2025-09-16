const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

// show list of users with search filter and pagination
const getListofUsers = catchAsync(async (req, res) => {
    const loggedInUser = req.user;
    const { search, limit = 10, page = 1 } = req.query;
    const numericLimit = parseInt(limit);
    const numericPage = parseInt(page);

    let query = {
        _id: { $ne: loggedInUser },
        ...(search && { fullName: { $regex: search, $options: 'i' } })
    }

    const users = await User.find(query)
        .sort({ createdAt: -1 })
        .skip((numericPage - 1) * numericLimit)
        .limit(numericLimit)
        .lean()

    const total = await User.countDocuments(query);
    return res.status(200).json({
        status: 200,
        message: 'User list fetched successfully',
        data: users,
        page: numericPage,
        limit: numericLimit,
        total
    })
})

// fetch chat list withs searching filters and pagination

const getAllChats = catchAsync(async (req, res) => {
    const { id: loggedInUser } = req?.user;
    const { search, page = 1, limit = 10 } = req.query;
    const numericLimit = parseInt(limit);
    const numericPage = parseInt(page);

    let matchquery = {};
    if (search) {
        const searchedUsers = await User.find({
            $and: [
                { _id: { $ne: loggedInUser } },
                { fullName: { $regex: search, $options: 'i' } }
            ]
        }).distinct('_id');
        if (searchedUsers?.length) {
            matchquery = {
                users: {
                    $all: [loggedInUser],
                    $in: searchedUsers
                }
            }
        } else {
            return res.status(200).json({
                status: 200,
                data: []
            })
        }
    } else {
        matchquery = { users: loggedInUser };
    }
    const chats = await Chat.find(matchquery)
    .populate('lastMessage')
    .populate('users')
    .sort({createdAt: -1})
    .skip((numericPage - 1) * numericLimit)
    .limit(numericLimit)
    .lean()

    const totalChats = await Chat.countDocuments(matchquery);
    return res.status(200).json({
        status: 200,
        message: 'Chat list fetched successfully',
        data: chats,
        total: totalChats,
        limit: numericLimit,
        page: numericPage
    })
})


module.exports = {
    getListofUsers,
    getAllChats
}