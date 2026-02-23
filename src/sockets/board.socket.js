const { boardUsers, userSockets } = require("./state");
const logger = require("../utils/logger");

module.exports = (io, socket) => {

  // Join board room
  socket.on("joinBoard", (boardId) => {

    socket.join(boardId);

    const userId = socket.user?.userId || socket.id;

    // Board mapping create if not exist
    if (!boardUsers[boardId])
      boardUsers[boardId] = new Map();

    boardUsers[boardId].set(socket.id, userId);

    // User socket tracking
    if (!userSockets[userId])
      userSockets[userId] = new Set();

    userSockets[userId].add(socket.id);

    logger.debug(`User ${userId} joined board ${boardId}`);

    // Broadcast presence
    io.to(boardId).emit("presence:update", {
      boardId,
      users: [...new Set(boardUsers[boardId].values())]
    });
  });

  // Leave board room
  socket.on("leaveBoard", (boardId) => {
    socket.leave(boardId);

    const userId = socket.user?.userId;

    if (boardUsers[boardId]) {
      boardUsers[boardId].delete(socket.id);

      if (boardUsers[boardId].size === 0) {
        delete boardUsers[boardId];
      } else {
        // Broadcast updated presence
        io.to(boardId).emit("presence:update", {
          boardId,
          users: [...new Set(boardUsers[boardId].values())]
        });
      }
    }

    if (userId && userSockets[userId]) {
      userSockets[userId].delete(socket.id);

      if (userSockets[userId].size === 0)
        delete userSockets[userId];
    }

    logger.debug(`User ${userId} left board ${boardId}`);
  });

  // Disconnect
  socket.on("disconnect", () => {

    const userId = socket.user?.userId;

    // Leave all board rooms and clean up
    for (const boardId in boardUsers) {
      if (boardUsers[boardId].has(socket.id)) {
        socket.leave(boardId);
        boardUsers[boardId].delete(socket.id);

        if (boardUsers[boardId].size === 0) {
          delete boardUsers[boardId];
        } else {
          // Broadcast updated presence
          io.to(boardId).emit("presence:update", {
            boardId,
            users: [...new Set(boardUsers[boardId].values())]
          });
        }
      }
    }

    if (userId && userSockets[userId]) {
      userSockets[userId].delete(socket.id);

      if (userSockets[userId].size === 0)
        delete userSockets[userId];
    }

    logger.debug("Disconnected:", socket.id);
  });
};
