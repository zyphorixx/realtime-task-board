const mongoose = require('mongoose');
const { MONGO_URI } = require('./serverConfig');

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } 
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
}

module.exports = connectDB;
