import { decodeToken } from "../utils/token.util.js";
import User from "../models/user.model.js";

const authSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Unauthorized"));

  const decoded = decodeToken(token);
  const userExists = await User.exists({ _id: decoded._id });
  if (!userExists) return next(new Error("Unauthorized"));

  socket.userId = decoded._id;
  next();
};

export default authSocket;
