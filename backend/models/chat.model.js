const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User'
            }
        ],
        chatName: {
            type: String
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        groupAdmin: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        lastMessage: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Messages'
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;