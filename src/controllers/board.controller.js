const boardService = require('../services/board.service');

const createBoard = async (req, res) => {
    const board = await boardService.createBoard({
        name : req.body.name,
        ownerId : req.user.id 
    });
    return res.status(201).json(board);
}

module.exports = { createBoard };

