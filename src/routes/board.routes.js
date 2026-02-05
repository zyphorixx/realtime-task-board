const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createBoard, deleteBoard } = require('../controllers/board.controller');

router.post('/', authenticate, createBoard);
router.delete('/:boardId', authenticate, hasRole(['OWNER']), deleteBoard);

module.exports = router;
