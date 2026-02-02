const boardService = require('../services/board.service');

const createBoard = async (req, res) => {
    const board = await boardService.createBoard({
        name : req.body.name,
        ownerId : "user_123" // hardcode on purpose
    });
    return res.status(201).json(board);
}

module.exports = { createBoard };

