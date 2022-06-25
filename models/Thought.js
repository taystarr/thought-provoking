const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    // thoughtText- string, required, between 1 and 280 characters
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // createdAt= Date, default current timestamp, use getter to format timestamp
    createdAt: {
        type: Date,
        default: Date.now
    },
    // username- string, required
    username: {
        type: String,
        required: true
    },
    // reactions aka replies- array of nested docs created with reactionSchema
    reactions: []
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;