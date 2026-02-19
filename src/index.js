require('dotenv').config();
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const jwt = require("jsonwebtoken");

const app = express();

/* ---------- security ---------- */
app.use(express.json({ limit:'10kb' }));
app.use(cors({ origin:["http://localhost:5173"], credentials:true }));
app.use(apiLimiter);

/* ---------- routes ---------- */
app.use('/boards', boardRoutes);
app.use('/auth', authRoutes);
app.use('/boards', cardRoutes);

/* ---------- server ---------- */
const server = http.createServer(app);

const io = new Server(server,{
  cors:{ origin:"http://localhost:5173" }
});

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

/* ---------- auth middleware ---------- */
io.use((socket,next)=>{
  try{
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  }catch{
    next(new Error("Unauthorized"));
  }
});

/* ---------- socket events ---------- */
io.on("connection", socket=>{
  boardSocket(io,socket);
});

/* ---------- start ---------- */
server.listen(PORT,()=>{
  console.log("Server running");
});