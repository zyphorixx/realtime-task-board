// for DB connect, server listen
require('dotenv').config();
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/db');

const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const boardRoutes = require('./routes/board.routes');
const authRoutes = require('./routes/auth.routes');
const cardRoutes = require('./routes/card.routes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '10kb' })); // prevent large payload abuse
app.use(require('cors')()); // basic CORS

connectDB();

app.use('/boards', boardRoutes); 
app.use('/auth', authRoutes);
app.use('/boards', cardRoutes);

app.get('/health', (req, res) => {
    res.json({
        status : 'OK',
        app : 'TaskBoard'
    });
});

app.use(errorHandler);

// SERVER
const server = http.createServer(app);

const io = new Server(server, {
    cors : {origin : '*'}
})

app.set("io", io);

//connection listener
const boardSocket = require('./sockets/board.socket');

const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  boardSocket(io, socket);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
