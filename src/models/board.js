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

module.exports = mongoose.model('Board', boardSchema);
