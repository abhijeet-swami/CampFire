const messageHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinPost", (postId) => {
      if (!postId) return;
      socket.join(postId);
    });

    socket.on("leavePost", (postId) => {
      if (!postId) return;
      socket.leave(postId);
    });

    socket.on("message", ({ roomId, text }) => {
      if (!roomId || !text) return;

      io.to(roomId).emit("message", {
        sender: socket.id,
        text,
      });
    });
  });
};

export default messageHandler;
