const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createCard, getCards, updateCard, deleteCard, getCard } = require('../controllers/card.controller');

// Create card → OWNER + EDITOR
router.post('/:boardId/cards',authenticate, hasRole(['OWNER', 'EDITOR']),createCard);

// Get cards → OWNER + EDITOR + VIEWER
router.get('/:boardId/cards',authenticate, hasRole(['OWNER', 'EDITOR', 'VIEWER']),getCards);

// Update card -> OWNER + EDITOR
router.patch('/:boardId/cards/:cardId', authenticate, hasRole(['OWNER', 'EDITOR']), updateCard);

// Delete card -> OWNER
router.delete('/:boardId/cards/:cardId', authenticate, hasRole(['OWNER']), deleteCard);

// Get card -> OWNER + EDITOR + VIEWER
router.get('/:boardId/cards/:cardId', authenticate, hasRole(['OWNER', 'EDITOR', 'VIEWER']), getCard);

module.exports = router;
