const express = require('express');
const router = express.Router();

const { createBoard } = require('../controllers/board.controller');
const authenticate = require('../middlewares/auth.middleware');

router.post('/', authenticate, createBoard);

module.exports = router;
