const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema({
    // username- string, unique, required, trimmed
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // email- string, required, unique, validate
    email: {
        type: String,
        required: true,
        unique: true,
        // validate w regex
        match: /[\w-]+@\w+.\w{2,3}/
    },
    // thoughts- array of _id referencing Thought model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // friends- array of _id self-referencing
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const User = model('User', UserSchema);

module.exports = User;