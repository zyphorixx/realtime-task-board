const express = require('express');
const router = express.Router();

const { createBoard } = require('../controllers/board.controller');

router.post('/', createBoard);

module.exports = router;
