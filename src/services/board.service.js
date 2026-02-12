const Board = require('../models/board');
const Activity = require('../models/activity');
const User = require('../models/user');

async function createBoard({ name, ownerId}) {
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

    await Activity.create({
       boardId: board._id,
       action: 'BOARD_CREATED',
       performedBy: ownerId,
       meta: { name }
    });

    return board;
}

async function deleteBoard({ boardId, performedBy }){

    const board = await Board.findById(boardId);

    if (!board) throw new Error('Board not found');

    await Board.findByIdAndDelete(boardId);

    await Activity.create({
       boardId,
       action: 'BOARD_DELETED',
       performedBy,
       meta: { name: board.name }
    });

    return board;
}

async function addMember({boardId, email, role, performedBy}) {
    // find user
    const user = await User.findOne({email});
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

    await Activity.create({
        boardId,
        action: 'MEMBER_ADDED',
        performedBy,
        meta: {
           addedUser: user._id,
           role
        }
    });

    await board.save();
    return board;
}

async function updateMemberRole({ boardId, userId, role, performedBy}){
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

    member.role = role;
    await board.save();

    await Activity.create({
       boardId,
       action: 'MEMBER_ROLE_UPDATED',
       performedBy,
       meta: { userId, role }
    });

    return board;
}

async function removeMember({ boardId, userId, performedBy }){
    const board = await Board.findById(boardId);
    if(!board){
        throw new Error('Board not found');
    }
    board.members = board.members.filter(
      m => m.userId.toString() !== userId
    );

    await board.save();

    await Activity.create({
        boardId,
        action : 'MEMBER_REMOVED',
        performedBy,
        meta : { userId }
    });

    return board;
}

async function getBoardById(boardId){
    return await Board.findById(boardId);
}

async function updateBoard(boardId, data, performedBy){
    const board = await Board.findByIdAndUpdate(
        boardId,
        data,
        {new : true}
    );

    if (!board) throw new Error('Board not found');

    await Activity.create({
        boardId,
        action: 'BOARD_UPDATED',
        performedBy,
        meta: data
    });

    return board;
}

async function getUserBoards(userId){
    return await Board.find({
        "members.userId" : userId
    });
}

module.exports = {
    createBoard,
    deleteBoard,
    addMember,
    updateMemberRole,
    removeMember,
    getBoardById,
    updateBoard,
    getUserBoards
}

