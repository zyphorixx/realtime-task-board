const { boardUsers, userSockets } = require("./state");

module.exports = (io, socket) => {

  // join board room
  socket.on("joinBoard", (boardId) => {

    socket.join(boardId);

    const userId = socket.user?.userId || socket.id;

    // board mapping create if not exist
    if (!boardUsers[boardId])
      boardUsers[boardId] = new Map();

    boardUsers[boardId].set(socket.id, userId);

    // user socket tracking
    if (!userSockets[userId])
      userSockets[userId] = new Set();

    userSockets[userId].add(socket.id);

    console.log(`User ${userId} joined board ${boardId}`);

    // broadcast presence
    io.to(boardId).emit("presence:update", {
      boardId,
      users: [...new Set(boardUsers[boardId].values())]
    });
  });

  // disconnect
  socket.on("disconnect", () => {

    const userId = socket.user?.userId;

    for (const boardId in boardUsers) {
      boardUsers[boardId].delete(socket.id);

      if (boardUsers[boardId].size === 0)
        delete boardUsers[boardId];
    }

    if (userSockets[userId]) {
      userSockets[userId].delete(socket.id);

      if (userSockets[userId].size === 0)
        delete userSockets[userId];
    }

    console.log("Disconnected:", socket.id);
  });
};