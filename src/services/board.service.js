const Board = require('../models/board');

async function createBoard(data) {
    const board = await Board.create(data);
    return board;
}

module.exports = {
    createBoard
}
