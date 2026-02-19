const rateLimit = require('express-rate-limit');

// general limiter for all routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: "Too many requests. Try again later."
});

// strict limiter for login route
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try later."
});

module.exports = {
  apiLimiter,
  authLimiter
};
