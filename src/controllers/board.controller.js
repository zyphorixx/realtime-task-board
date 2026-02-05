const boardService = require('../services/board.service');

const createBoard = async (req, res) => {
    const board = await boardService.createBoard({
        name : req.body.name,
        ownerId : req.user.id 
    });
    return res.status(201).json(board);
}

const deleteBoard = async (req, res) => {
    await boardService.deleteBoard(req.params.boardId);
    return res.status(200).json({
        message : 'Board deleted successfully'
    });
}

module.exports = { 
    createBoard,
    deleteBoard
 };

