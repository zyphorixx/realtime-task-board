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

async function addMember({boardId, email, role}) {
    // find user
    const user = await Board.findOne({email});
    if(!user){
        throw new Error('User not found');
    }

    // find board
    const board = await Board.findById(boardId);
    if(!board){
        throw new Error('Board not found');
    }

    //user already a member?
    const exists = board.members.find(
        m => m.userId.toString() === user._id.toString()
    );

    if(exists){
        throw new Error('User already a member');
    }
    
    board.members.push({
      userId: user._id,
      role
    });

    await board.save();
    return board;
}

async function updateMembeRole({ boardId, userId, role }){
    const board = await Board.findById(boardId);
    if(!board){
        throw new Error('Board not found');
    }

    const member = board.members.find(
       m => m.userId.toString() === userId
    );

    if(!member){
        throw new Error('Member not found');
    }

    momber.role = role;
    await board.save();

    return board;
}

async function removeMember({ boardId, userId }){
    const board = Board.findById(boardId);
    if(!board){
        throw new Error('Board not found');
    }
    board.members = board.members.filter(
      m => m.userId.toString() !== userId
    );

    await board.save();
    return board;

}
module.exports = {
    createBoard,
    deleteBoard,
    addMember,
    updateMembeRole,
    removeMember
}

