const jwt = require('jsonwebtoken');
const cookie = require("cookie");
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Messages = require('../models/message.model');

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
    try {
        console.log('Data received in sendMessage:', data);
        
        let { chatId, receiverId, message } = data;
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            // Instead of throwing, send an error back to the sender
            socket.emit('error_message', { error: 'Receiver not found' });
            return;
        }

        if (!chatId) chatId = await createNewChat(socket, receiver?.id, receiver?.fullName);

        const newMessage = await Messages.create({
            chatId,
            message,
            sender: socket?.user?.id,
            unreadBy: !!receiver?.socketId && receiver?.isOnline ? [] : [receiver?.id]
        });

        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: newMessage?.id
        });

        if (!!receiver?.socketId) {
            io.to(receiver?.socketId).emit('new_message', newMessage);
        }

    } catch (error) {
        console.error('Error in sendMessage:', error);
        socket.emit('error_message', { error: error.message || 'Internal server error' });
    }
};

const getAllMessages = async (io, socket, data) => {
    const { chatId } = data;

    // get all messages for this chat
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