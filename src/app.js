const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes");
const cardRoutes = require("./routes/card.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);

module.exports = app;
