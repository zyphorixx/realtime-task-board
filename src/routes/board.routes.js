const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const { createBoard, deleteBoard, addMember, updateRole, removeMember } = require('../controllers/board.controller');

router.post('/', authenticate, createBoard);
router.delete('/:boardId', authenticate, hasRole(['OWNER']), deleteBoard);

router.post( '/:boardId/members',authenticate,hasRole(['OWNER']),addMember);
router.patch('/:boardId/members/:userId',authenticate,hasRole(['OWNER']),updateRole);
router.delete('/:boardId/members/:userId',authenticate,hasRole(['OWNER']), removeMember);

module.exports = router;
