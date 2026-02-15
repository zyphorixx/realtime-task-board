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

// user membership lookup fast karega
boardSchema.index({ "members.userId": 1 });

// owner boards fast fetch honge
boardSchema.index({ ownerId: 1 });

// latest boards fast sorting ke liye
boardSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Board', boardSchema);
