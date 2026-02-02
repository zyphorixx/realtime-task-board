const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema({
    name : String,
    ownerId : String
}, {timestamps : true });

module.exports = mongoose.model('Board', boardSchema);
