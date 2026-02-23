#!/bin/bash

echo "Starting TaskBoard Backend..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Warning: MongoDB is not running. Please start MongoDB first."
    echo "You can start it with: mongod --dbpath /data/db"
fi

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "Warning: Redis is not running. Please start Redis first."
    echo "You can start it with: redis-server"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting server on port $PORT..."
npm run dev