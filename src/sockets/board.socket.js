const { boardUsers } = require("./state");

module.exports = (io, socket) => {

  // join board
  socket.on("joinBoard", ({ boardId, userId }) => {

    socket.join(boardId);

    if (!boardUsers[boardId])
      boardUsers[boardId] = new Map();

    boardUsers[boardId].set(socket.id, userId);

    // send updated presence list
    io.to(boardId).emit("presence:update",
      Array.from(boardUsers[boardId].values())
    );

    console.log(`User ${userId} joined board ${boardId}`);
  });


  // typing indicator
  socket.on("typing", ({ boardId, user }) => {
    socket.to(boardId).emit("typing", user);
  });


  // leaving board
  socket.on("leaveBoard", (boardId) => {

    socket.leave(boardId);

    if (boardUsers[boardId]) {
      boardUsers[boardId].delete(socket.id);

      io.to(boardId).emit(
        "presence:update",
        Array.from(boardUsers[boardId].values())
      );
    }
  });


  // disconnect cleanup
  socket.on("disconnect", () => {

    for (const boardId in boardUsers) {

      if (boardUsers[boardId].has(socket.id)) {

        boardUsers[boardId].delete(socket.id);

        io.to(boardId).emit(
          "presence:update",
          Array.from(boardUsers[boardId].values())
        );
      }
    }

    console.log("Socket disconnected:", socket.id);
  });

};