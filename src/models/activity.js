const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    boardId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Board'
    },
    action : String,
    performedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    meta : Object
}, {timestamps : true});

// Index for fast board activity feed
activitySchema.index({ boardId: 1 });

// Index for sorting by latest activity
activitySchema.index({ createdAt: -1 });

// Index for user activity queries (future)
activitySchema.index({ performedBy: 1 });

module.exports = mongoose.model('Activity', activitySchema);
