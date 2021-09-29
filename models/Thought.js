var mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdValue) => dateFormat(createdValue)
    }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdValue) => dateFormat(createdValue)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
           virtuals: true,
           getters: true 
        },
        id: false 
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

mongoose.model('Thought', ThoughtSchema);
module.exports = Thought;