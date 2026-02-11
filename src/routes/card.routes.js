const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createCard, getCards, updateCard, deleteCard } = require('../controllers/card.controller');

// Create card → OWNER + EDITOR
router.post('/:boardId/cards',authenticate,hasRole(['OWNER', 'EDITOR']),createCard);

// Get cards → OWNER + EDITOR + VIEWER
router.get('/:boardId/cards',authenticate,hasRole(['OWNER', 'EDITOR', 'VIEWER']),getCards);

// Update card -> OWNER + EDITOR
router.patch('/:boardId/cards/:cardId', authenticate, hasRole(['OWNER', 'EDITOR']), updateCard);

// Delete card -> OWNER
router.delete('/:boardId/cards/:cardId', authenticate, hasRole(['OWNER']), deleteCard);

module.exports = router;
