const mongoose = require('mongoose');
const { MONGO_URI } = require('./serverConfig');
const logger = require('../utils/logger');

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
  } 
  catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
