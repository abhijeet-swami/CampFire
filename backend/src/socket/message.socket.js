import {
  addMessage,
  editMessage,
  deleteMessage,
} from "../controllers/message.contoller.js";

const messageHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinPost", (postId) => {
      if (!postId) return;
      if (socket.postId) socket.leave(socket.postId);
      socket.postId = postId;
      socket.join(postId);
    });

    socket.on("message", async ({ campId, postId, text }) => {
      try {
        if (!postId || !text || !campId)
          throw new Error("postId, campId and text required");
        const message = await addMessage(socket.userId, campId, postId, text);
        if (!message) throw new Error("Failed to send message");
        io.to(postId).emit("message", {
          sender: socket.id,
          text,
          message,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    });

    socket.on("edit-message", async ({ messageId, text }) => {
      try {
        if (!messageId || !text) throw new Error("MessageId and text required");
        const update = await editMessage(userId, messageId, text);
        if (!update) throw new Error("Failed to update message");
        io.to(postId).emit("edit-message", {
          sender: socket.id,
          text,
          update,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    });

    socket.on("delete-message", async ({ messageId }) => {
      try {
        if (!messageId) throw new Error("MessageId required");
        const deleted = await deleteMessage(userId, messageId);
        if (!deleted) throw new Error("Failed to delete message");
        io.to(postId).emit("delete-message", {
          sender: socket.id,
          messageId,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    });
  });
};

export default messageHandler;
