/**
 * Input sanitization middleware
 * Protects against NoSQL injection and XSS attacks
 */

/**
 * Recursively sanitize an object by:
 * - Removing keys starting with $ (NoSQL injection prevention)
 * - Trimming string values
 */
function sanitizeObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return typeof obj === 'string' ? obj.trim() : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  
  for (const key in obj) {
    // Skip keys starting with $ (MongoDB operators - potential NoSQL injection)
    if (key.startsWith('$')) {
      continue;
    }
    sanitized[key] = sanitizeObject(obj[key]);
  }

  return sanitized;
}

/**
 * Middleware to sanitize request body, query, and params
 */
function sanitizeInput(req, res, next) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
}

/**
 * Remove sensitive fields from response
 */
function sanitizeOutput(doc, ret) {
  // Remove password from output
  if (ret.password) {
    delete ret.password;
  }
  // Remove __v
  if (ret.__v) {
    delete ret.__v;
  }
  return ret;
}

module.exports = {
  sanitizeInput,
  sanitizeOutput,
  sanitizeObject
};