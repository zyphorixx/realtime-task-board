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
      await boardService.deleteBoard({
        boardId : req.params.boardId,
        performedBy: req.user.id
      });
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
            role : req.body.role,
            performedBy: req.user.id
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
      role: req.body.role,
      performedBy: req.user.id
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
      userId: req.params.userId,
      performedBy: req.user.id
    });

    res.status(200).json(board);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getBoard(req, res){
  try {
    const board = await boardService.getBoardById(req.params.boardId);

    if(!board){
      return res.status(404).json({message : "Board not found"});
    }
    return res.status(200).json(board);
  } 
  catch (error) {
    return res.status(400).json({message : error.message});
  }
}

async function updateBoard(req, res){
  try {
    const updatedBoard = await boardService.updateBoard(
      req.params.boardId,
      req.body,
      req.user.id
    );
    
    if(!updatedBoard){
      return res.status(404).json({message : "Board cannot be updated"});
    }

    return res.status(200).json(updatedBoard);
  } 
  catch (error) {
    return res.status(400).json({message : error.message});
  }
}

async function getBoards(req, res){
  try {
    const boards = await boardService.getUserBoards(req.user.userId);
    return res.status(200).json(boards);
  } 
  catch (error) {
    res.status(400).json({message : error.message});
  }
}

async function getActivity(req, res) {
  try {
    const activity = await boardService.getBoardActivity(
      req.params.boardId
    );
    res.status(200).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { 
    createBoard,
    deleteBoard,
    addMember,
    removeMember,
    updateRole,
    getBoard,
    updateBoard,
    getBoards,
    getActivity
 };


 