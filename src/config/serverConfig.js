const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  if (process.env.NODE_ENV !== 'test') {
    process.exit(1);
  }
}

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CORS_ORIGIN,
  REDIS_URL
};


