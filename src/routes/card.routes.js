const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const validate = require('../middlewares/validate');
const validateObjectId = require('../middlewares/validateObjectId');

const { createCard, getCards, updateCard, deleteCard, getCard } = require('../controllers/card.controller');
const { createCardSchema, updateCardSchema } = require('../validators/card.validator');

// Create card -> OWNER + EDITOR
router.post(
  '/:boardId/cards',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER', 'EDITOR']),
  validate(createCardSchema),
  createCard
);

// Get cards -> OWNER + EDITOR + VIEWER
router.get(
  '/:boardId/cards',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER', 'EDITOR', 'VIEWER']),
  getCards
);

// Update card -> OWNER + EDITOR
router.patch(
  '/:boardId/cards/:cardId',
  authenticate,
  validateObjectId('boardId', 'cardId'),
  hasRole(['OWNER', 'EDITOR']),
  validate(updateCardSchema),
  updateCard
);

// Delete card -> OWNER
router.delete(
  '/:boardId/cards/:cardId',
  authenticate,
  validateObjectId('boardId', 'cardId'),
  hasRole(['OWNER']),
  deleteCard
);

// Get card -> OWNER + EDITOR + VIEWER
router.get(
  '/:boardId/cards/:cardId',
  authenticate,
  validateObjectId('boardId', 'cardId'),
  hasRole(['OWNER', 'EDITOR', 'VIEWER']),
  getCard
);

module.exports = router;
