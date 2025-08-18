const jwt = require('jsonwebtoken');
const cookie = require("cookie");
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Messages = require('../models/message.model');
const socket = require('../socket');

const authenticateConnection = async (socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies['token']
        if (!token) {
            const err = new Error('Token is required')
            return next(err);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded?.sub;
        const user = await User.findById(id);
        console.log(user,'socket user')
        socket.user = user;
        next();
    } catch (error) {
        console.log('Err:', error)
        return next(new Error(error?.message))
    }
};

const connectUser = async (socket) => {
    try {
        const { user } = socket;
        // make connected user online
        await User.findByIdAndUpdate(user?._id, {
            socketId: socket?.id,
            isOnline: true
        });

    } catch (err) {
        console.error('Error:', err?.message);
        socket?.disconnect();
    }
}

const disconnectUser = async (socket) => {
    try {
        const { user } = socket;
        // make connected user offline
        await User.findByIdAndUpdate(user?._id, {
            isOnline: false
        });

    } catch (err) {
        console.error('Error:', err?.message);
        socket?.disconnect();
    }
}

// if user come from existing chat then chat id else user id

const createNewChat = async (socket, receiverId, receiverName) => {
    const { user: senderUser } = socket;
    const payload = {
        users: [senderUser?.id, receiverId],
        chatName: receiverName
    }
    const newChat = await Chat.create(payload);
    return newChat?._id;
}


const sendMessage = async (io, socket, data) => {
    let { chatId, receiverId, message } = data;
    const receiver = await User.findById(receiverId);
    if (!receiver) throw new Error("Receiver not found");
    if (!chatId) chatId = await createNewChat(socket, receiver?.id, receiver?.fullName);

    // unreadBy logic is if reciever does not have socket id and its not online then store this user as unreadBy
    const newMessage = await Messages.create({
        chatId,
        message,
        sender: socket?.user?.id,
        unreadBy: !!receiver?.socketId && receiver?.isOnline ? [] : [receiver?.id]
    })

    await Chat.findByIdAndUpdate(chatId, {
        latestMessage: newMessage?.id
    })

    if (!!receiver?.socketId) {
        io.to(receiver?.socketId).emit('new_message', data?.newMessage);

        // user will listen to above event to get the latest message
    }
}

const getAllMessages = async (io, socket, data) => {
    const { chatId } = data;
    const messages = await Messages.find({ chatId })
        .populate('sender')
        .sort({ createdAt: 1 });
    io.to(socket?.id).emit('all_messages', messages);
}


module.exports = {
    authenticateConnection,
    connectUser,
    disconnectUser,
    sendMessage,
    getAllMessages
}