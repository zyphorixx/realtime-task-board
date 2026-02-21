require('dotenv').config();

const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");

const { apiLimiter } = require('./middlewares/rateLimiter');

const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const jwt = require("jsonwebtoken");

/* ---------- ROUTES IMPORT ---------- */
const boardRoutes = require('./routes/board.routes');
const authRoutes = require('./routes/auth.routes');
const cardRoutes = require('./routes/card.routes');
const activityRoutes = require('./routes/activity.routes');

/* ---------- SOCKET HANDLER ---------- */
const boardSocket = require('./sockets/board.socket');

const app = require("./app");

/* ---------- CONFIG ---------- */
const PORT = process.env.PORT || 3000;

/* ---------- security ---------- */
app.use(express.json({ limit:'10kb' }));
app.use(cors({ origin:["http://localhost:5173"], credentials:true }));
app.use(apiLimiter);

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

/* ---------- routes ---------- */
app.use('/boards', boardRoutes);
app.use('/auth', authRoutes);
app.use("/api/boards", cardRoutes);
app.use('/boards', activityRoutes);
/* ---------- server ---------- */
const server = http.createServer(app);

const io = new Server(server,{
  cors:{ origin:"http://localhost:5173" }
});

global.io = io; // Make io globally accessible

app.set("io", io);

/* ---------- redis adapter ---------- */
async function initRedis(){
  const pubClient = createClient({ url:"redis://127.0.0.1:6379" });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();
  io.adapter(createAdapter(pubClient, subClient));
}
initRedis();

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'TaskBoard'
  });
});

/* ---------- auth middleware ---------- */
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token)
      return next(new Error("No token provided"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded; // attach real user
    next();

  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

/* ---------- socket events ---------- */
io.on("connection", socket=>{
  console.log("Socket connected:", socket.id);

  boardSocket(io,socket);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

/* ---------- start ---------- */
(async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})();
