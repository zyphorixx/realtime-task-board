const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes");
const cardRoutes = require("./routes/card.routes");
const activityRoutes = require("./routes/activity.routes");
const errorHandler = require("./middlewares/errorHandler");
const { sanitizeInput } = require("./middlewares/sanitize");
const { apiLimiter } = require("./middlewares/rateLimiter");

const app = express();

// CORS configuration - use environment variable for production
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(cors({ 
  origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://3.110.33.195:5173'], 
  credentials: true 
}));
app.use(apiLimiter);
app.use(sanitizeInput);  // Sanitize inputs against NoSQL injection

// API Routes
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/boards", cardRoutes);  // cards are under /boards/:boardId/cards
app.use("/boards", activityRoutes);  // activity is under /boards/:boardId/activity

// Global error handler
app.use(errorHandler);

module.exports = app;
