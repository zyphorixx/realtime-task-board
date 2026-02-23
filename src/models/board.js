const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },
    members : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },
            role : {
                type : String,
                enum : ['OWNER', 'EDITOR', 'VIEWER'],
                default : 'VIEWER'
            }
        }
    ]
}, {timestamps : true });

// Index for fast user membership lookup
boardSchema.index({ "members.userId": 1 });

// Index for fast owner boards fetch
boardSchema.index({ ownerId: 1 });

// Index for sorting by latest boards
boardSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Board', boardSchema);
