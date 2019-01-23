const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({

    date: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Messages = mongoose.model('messages', MessagesSchema);

module.exports = Messages;