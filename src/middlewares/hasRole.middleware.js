const Board = require('../models/board');
const logger = require('../utils/logger');

function hasRole(allowedRoles = []) {
  
  // This middleware returns a function
  return async function (req, res, next) {
    try {
      const userId = req.user.id; // User from JWT
      const boardId = req.params.boardId || req.body.boardId;
      
      // Check if boardId is valid
      if (!boardId) {
        return res.status(400).json({ message: 'Board ID is required' });
      }
      
      // Check if board exists
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      // Check if user is board owner (via ownerId field)
      const isOwner = board.ownerId && board.ownerId.equals(req.user.id);
      
      // Check if user is in members array
      const member = board.members.find(
        m => m.userId.equals(req.user.id)
      );

      // User must be either owner OR a member
      if (!isOwner && !member) {
        return res.status(403).json({ message: 'You are not a board member' });
      }

      // Determine user's role: OWNER takes precedence
      const userRole = isOwner ? 'OWNER' : member.role;

      logger.debug('RBAC CHECK:', {
        userId,
        boardId,
        isOwner,
        role: userRole,
        allowedRoles
      });
      
      // Check if role is allowed
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // Attach board and user role to request
      req.board = board;
      req.userRole = userRole;

      // All good → proceed to controller
      next();

    } catch (error) {
      logger.error('Role validation failed:', error.message);
      return res.status(500).json({ message: 'Role validation failed' });
    }
  };
}

module.exports = hasRole;

