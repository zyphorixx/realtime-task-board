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

// board activity feed fast
activitySchema.index({ boardId: 1 });

// latest activity first
activitySchema.index({ createdAt: -1 });

// user activity queries (future)
activitySchema.index({ performedBy: 1 });

module.exports = mongoose.model('Activity', activitySchema);
