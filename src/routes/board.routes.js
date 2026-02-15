const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const validate = require('../middlewares/validate');

const { createBoard, deleteBoard, addMember, updateRole, removeMember, getBoard, updateBoard, getBoards } = require('../controllers/board.controller');
const { createBoardSchema, addMemberSchema } = require('../validators/board.validator');


router.post('/', authenticate, validate(createBoardSchema), createBoard);
router.post( '/:boardId/members',authenticate,hasRole(['OWNER']), validate(addMemberSchema), addMember);
router.delete('/:boardId', authenticate, hasRole(['OWNER']), deleteBoard);
router.patch('/:boardId/members/:userId',authenticate,hasRole(['OWNER']),updateRole);
router.delete('/:boardId/members/:userId',authenticate,hasRole(['OWNER']), removeMember);
router.get('/', authenticate, getBoards);
router.get('/:boardId', authenticate, hasRole(['OWNER', 'EDITOR', 'VIEWER']), getBoard);
router.patch('/:boardId', authenticate, hasRole(['OWNER']), updateBoard);

module.exports = router;
