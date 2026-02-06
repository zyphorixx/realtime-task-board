const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createCard, getCards } = require('../controllers/card.controller');

// Create card → OWNER + EDITOR
router.post('/:boardId/cards',authenticate,hasRole(['OWNER', 'EDITOR']),createCard);

// Get cards → OWNER + EDITOR + VIEWER
router.get('/:boardId/cards',authenticate,hasRole(['OWNER', 'EDITOR', 'VIEWER']),getCards);

module.exports = router;
