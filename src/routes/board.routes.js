const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createBoard, deleteBoard, addMember, updateRole, removeMember, getBoard, updateBoard, getBoards } = require('../controllers/board.controller');

router.post('/', authenticate, createBoard);
router.delete('/:boardId', authenticate, hasRole(['OWNER']), deleteBoard);

router.post( '/:boardId/members',authenticate,hasRole(['OWNER']),addMember);
router.patch('/:boardId/members/:userId',authenticate,hasRole(['OWNER']),updateRole);
router.delete('/:boardId/members/:userId',authenticate,hasRole(['OWNER']), removeMember);
router.get('/:boardId', authenticate, hasRole(['OWNER', 'EDITOR', 'VIEWER']), getBoard);
router.get('/', authenticate, getBoards);
router.patch('/:boardId', authenticate, hasRole(['OWNER']), updateBoard);

module.exports = router;
