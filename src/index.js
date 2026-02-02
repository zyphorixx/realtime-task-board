// for DB connect, server listen
require('dotenv').config();
const express = require('express');
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/db');

const boardRoutes = require('./routes/board.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/boards', boardRoutes);  // calling the boardRoutes 

app.get('/health', (req, res) => {
    res.json({
        status : 'OK',
        app : 'TaskBoard'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
