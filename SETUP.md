# TaskBoard Backend Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (running locally or cloud instance)
3. **Redis** (running locally or cloud instance)

## Installation

### 1. Install Dependencies
```bash
cd backend/TaskBoard
npm install
```

### 2. Environment Setup
Copy the example environment file and configure your settings:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskboard
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=DEBUG
```

### 3. Start Services

#### Option 1: Use the startup script (recommended)
```bash
./start.sh
```

#### Option 2: Manual startup
```bash
# Start MongoDB (if not running as service)
mongod --dbpath /data/db

# Start Redis (if not running as service)
redis-server

# Install dependencies (if not already done)
npm install

# Start the server
npm run dev
```

## Service URLs

- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Health Check**: http://localhost:3000/health

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --dbpath /data/db`
- Check connection string in `.env`
- Verify MongoDB is accessible

### Redis Connection Issues
- Ensure Redis is running: `redis-server`
- Check Redis URL in `.env`
- Verify Redis is accessible

### Socket Connection Issues
- Ensure frontend and backend domains match CORS configuration
- Check that JWT tokens are being passed correctly
- Verify socket authentication format

### Common Errors
- **EADDRINUSE**: Port 3000 is already in use. Kill the process or use a different port.
- **Connection Refused**: MongoDB or Redis not running.
- **CORS Error**: Frontend domain not in CORS whitelist.

## Development

- **Development Server**: `npm run dev` (with nodemon)
- **Production Server**: `npm start`
- **Tests**: `npm test`