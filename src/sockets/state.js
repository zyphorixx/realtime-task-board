// boardId → Map(socketId → userId)
const boardUsers = {};

// userId → Set(socketIds)
// ek user multiple tabs open kare toh track rahe
const userSockets = {};

module.exports = {
  boardUsers,
  userSockets
};