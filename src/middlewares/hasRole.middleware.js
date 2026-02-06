const Board = require('../models/board');

function hasRole(allowedRoles = []) {

  // Ye middleware return karta hai ek function
  return async function (req, res, next) {
    try {
      

      const userId = req.user.id; // JWT se aaya hua user
      const boardId = req.params.boardId || req.body.boardId;
      
      // Board exist karta hai ya nahi
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      // Check karo user board ka member hai ya nahi
      const member = board.members.find(
        m => m.userId.toString() === userId
      );

      if (!member) {
        return res.status(403).json({ message: 'You are not a board member' });
      }

      console.log('RBAC CHECK:', {
        userId,
        boardId,
        role: member.role,
        allowedRoles
      });
      
      // Role allowed hai ya nahi
      if (!allowedRoles.includes(member.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // Board ko request me attach kar diya 
      req.board = board;

      // Sab sahi → controller ko jaane do
      next();

    } catch (error) {
      return res.status(500).json({ message: 'Role validation failed' });
    }
  };
}

module.exports = hasRole;
