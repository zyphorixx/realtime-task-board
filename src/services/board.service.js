const Board = require('../models/boards');

async function createBoard(data) {
    const board = await Board.create(data);
    return board;
}

module.exports = {
    createBoard
}
