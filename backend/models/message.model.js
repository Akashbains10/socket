const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Chat'
        },
        message: {
            type: String
        },
        sender: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        unreadBy: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;