const boardService = require('../services/board.service');

const createBoard = async (req, res) => {
  try {
    const board = await boardService.createBoard({
      name: req.body.name,
      ownerId: req.user.id
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteBoard = async (req, res) => {
    try {
      await boardService.deleteBoard(req.params.boardId);
      return res.status(200).json({
        message : 'Board deleted successfully'
      });
    } 
    catch (error) {
      return res.status(400).json({ message : err.message});
    }
}

const addMember = async (req, res) => {
    try {
        const board = await boardService.addMember({
            boardId : req.params.boardId,
            email : req.body.email,
            role : req.body.role
        });
        res.status(200).json(board);
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateRole(req, res) {
  try {
    const board = await boardService.updateMemberRole({
      boardId: req.params.boardId,
      userId: req.params.userId,
      role: req.body.role
    });

    res.status(200).json(board);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function removeMember(req, res) {
  try {
    const board = await boardService.removeMember({
      boardId: req.params.boardId,
      userId: req.params.userId
    });

    res.status(200).json(board);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { 
    createBoard,
    deleteBoard,
    addMember,
    removeMember,
    updateRole
 };

