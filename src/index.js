require('dotenv').config();
const express = require('express');

const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = require("./app");
const boardSocket = require('./sockets/board.socket');
const logger = require('./utils/logger');
const redis = require('./config/redis');

/* ---------- CONFIG ---------- */
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Serve static files (must be after routes in app.js, so we add it here)
app.use(express.static(path.join(__dirname, "public")));

/* ---------- Health Check ---------- */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'TaskBoard'
  });
});

/* ---------- Server ---------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { 
    origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://3.110.33.195:5173'],
    credentials: true 
  }
});

global.io = io; // Make io globally accessible

app.set("io", io);

/* ---------- Redis Adapter ---------- */
async function initRedis() {
  try {
    const pubClient = createClient({
      url: process.env.REDIS_URL
    });

    const subClient = pubClient.duplicate();

    await pubClient.connect();
    await subClient.connect();

    io.adapter(createAdapter(pubClient, subClient));

    logger.info("Redis Adapter Connected");
  } catch (err) {
    logger.error("Redis connection failed:", err.message);
  }
}
initRedis();

/* ---------- Socket Auth Middleware ---------- */
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded; // attach real user
    next();

  } catch (err) {
    logger.warn("Socket auth failed:", err.message);
    next(new Error("Unauthorized"));
  }
});

/* ---------- Socket Events ---------- */
io.on("connection", socket => {
  logger.info("Socket connected:", socket.id);

  boardSocket(io, socket);

  socket.on("disconnect", () => {
    logger.info("Socket disconnected:", socket.id);
  });
});

/* ---------- Graceful Shutdown ---------- */
async function shutdown(signal) {
  logger.info(`${signal} received. Shutting down gracefully...`);
  
  // Stop accepting new connections
  server.close(() => {
    logger.info('HTTP server closed');
  });
  
  // Close all socket connections
  io.close(() => {
    logger.info('Socket.IO server closed');
  });
  
  // Close Redis connection
  try {
    await redis.quit();
    logger.info('Redis connection closed');
  } catch (err) {
    logger.error('Error closing Redis:', err.message);
  }
  
  // Close MongoDB connection
  try {
    const mongoose = require('mongoose');
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (err) {
    logger.error('Error closing MongoDB:', err.message);
  }
  
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message);
  logger.error(err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

/* ---------- Start Server ---------- */
(async () => {
  try {
    await connectDB();
    
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`CORS Origin: ${CORS_ORIGIN}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();
