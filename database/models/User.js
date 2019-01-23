const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        select: true
    },
    friends:
        {
            type: [{ type: mongoose.Schema.Types.ObjectId}],
            ref: 'users',
            select: false
        }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;