const boardService = require('../services/board.service');
const asyncHandler = require('../utils/asyncHandler');

const createBoard = asyncHandler(async (req, res) => {

  const board = await boardService.createBoard({
    name: req.body.name,
    ownerId: req.user.id
  });

  res.status(201).json(board);
});

const deleteBoard = asyncHandler(async (req, res) => {

  await boardService.deleteBoard({
    boardId: req.params.boardId,
    performedBy: req.user.id
  });

  res.status(200).json({
    message: 'Board deleted successfully'
  });
});

const addMember = asyncHandler(async (req, res) => {

  const board = await boardService.addMember({
    boardId: req.params.boardId,
    email: req.body.email,
    role: req.body.role,
    performedBy: req.user.id
  });

  res.status(200).json(board);
});

const updateRole = asyncHandler(async (req, res) => {

  const board = await boardService.updateMemberRole({
    boardId: req.params.boardId,
    userId: req.params.userId,
    role: req.body.role,
    performedBy: req.user.id
  });

  res.status(200).json(board);
});

const removeMember = asyncHandler(async (req, res) => {

  const board = await boardService.removeMember({
    boardId: req.params.boardId,
    userId: req.params.userId,
    performedBy: req.user.id
  });

  res.status(200).json(board);
});

const getBoard = asyncHandler(async (req, res) => {

  const board = await boardService.getBoardById(req.params.boardId);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  res.status(200).json(board);
});

const updateBoard = asyncHandler(async (req, res) => {

  const updatedBoard = await boardService.updateBoard(
    req.params.boardId,
    req.body,
    req.user.id
  );

  if (!updatedBoard) {
    res.status(404);
    throw new Error('Board not found');
  }

  res.status(200).json(updatedBoard);
});

const getBoards = asyncHandler(async (req, res) => {

  const boards = await boardService.getUserBoards(req.user.id);
  res.status(200).json(boards);
});


module.exports = {
  createBoard,
  deleteBoard,
  addMember,
  removeMember,
  updateRole,
  getBoard,
  updateBoard,
  getBoards
};
