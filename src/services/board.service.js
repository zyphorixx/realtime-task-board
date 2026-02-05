const Board = require('../models/board');

async function createBoard({ name, ownerId }) {
    const board = await Board.create({
        name,
        ownerId,
        members : [
            {
                userId : ownerId,
                role : 'OWNER'
            }
        ]
    });
    return board;
}

async function deleteBoard(boardId){
    const response = await Board.findByIdAndDelete(boardId);
    return response;
}
module.exports = {
    createBoard,
    deleteBoard
}

