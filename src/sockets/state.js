// boardId -> Map(socketId -> userId)
const boardUsers = {};

// userId -> Set(socketIds)
// Track multiple tabs/connections per user
const userSockets = {};

module.exports = {
  boardUsers,
  userSockets
};