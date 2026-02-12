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

module.exports = mongoose.model('Activity', activitySchema);
