import { decodeToken } from "../utils/token.util.js";
import User from "../models/user.model.js";

const authSocket = async (socket, next) => {
  try {
    const cookies = Object.fromEntries(
      (socket.handshake.headers.cookie || "")
        .split("; ")
        .map((c) => c.split("=")),
    );

    const token = cookies.uid;
    if (!token) return next(new Error("Unauthorized"));

    const decoded = decodeToken(token);
    if (!decoded) return next(new Error("Unauthorized"));
    const userExists = await User.exists({ _id: decoded._id });
    if (!userExists) return next(new Error("Unauthorized"));

    socket.userId = decoded._id;
    next();
  } catch (error) {
    return next(error);
  }
};

export default authSocket;
