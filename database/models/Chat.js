const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }]

});

const Chat = mongoose.model('chats', ChatSchema);
module.exports = Chat;