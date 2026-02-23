const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const validate = require('../middlewares/validate');
const validateObjectId = require('../middlewares/validateObjectId');

const { createBoard, deleteBoard, addMember, updateRole, removeMember, getBoard, updateBoard, getBoards } = require('../controllers/board.controller');
const { createBoardSchema, updateBoardSchema, addMemberSchema, updateMemberRoleSchema } = require('../validators/board.validator');

// Create board
router.post(
  '/',
  authenticate,
  validate(createBoardSchema),
  createBoard
);

// Get all user's boards
router.get(
  '/',
  authenticate,
  getBoards
);

// Get single board
router.get(
  '/:boardId',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER', 'EDITOR', 'VIEWER']),
  getBoard
);

// Update board
router.patch(
  '/:boardId',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER']),
  validate(updateBoardSchema),
  updateBoard
);

// Delete board
router.delete(
  '/:boardId',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER']),
  deleteBoard
);

// Add member to board
router.post(
  '/:boardId/members',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER']),
  validate(addMemberSchema),
  addMember
);

// Update member role
router.patch(
  '/:boardId/members/:userId',
  authenticate,
  validateObjectId('boardId', 'userId'),
  hasRole(['OWNER']),
  validate(updateMemberRoleSchema),
  updateRole
);

// Remove member from board
router.delete(
  '/:boardId/members/:userId',
  authenticate,
  validateObjectId('boardId', 'userId'),
  hasRole(['OWNER']),
  removeMember
);

module.exports = router;
