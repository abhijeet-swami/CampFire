import { Server } from "socket.io";
import messageHandler from "./message.socket.js";
import authSocket from "../socket/auth.socket.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(authSocket);
  messageHandler(io);

  return io;
};

export default initSocket;
