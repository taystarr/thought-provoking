const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    // reactionId- use ObjectId data type, default set to new ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    // reactionBody- string, required, 280 character max
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // username- string, required
    username: {
        type: String,
        required: true,
    },
    // createdAt- date, set defult to current timestamp
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    _id: false
});

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
        required: true,
    },
    // reactions aka replies- array of nested docs created with reactionSchema
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
// const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought;
// module.exports = Reaction;