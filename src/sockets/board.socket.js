module.exports = (io, socket) => {

  // user joins board room
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log("Joined board:", boardId);
  });

  // leave board
  socket.on("leaveBoard", (boardId) => {
    socket.leave(boardId);
  });

};