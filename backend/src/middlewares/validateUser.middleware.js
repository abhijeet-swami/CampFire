import { decodeToken } from "../utils/token.util.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";

const validateUser = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.uid;
  if (!token) throw new ApiError("Authentication required", 401);

  const userId = decodeToken(token);
  if (!userId)
    throw new ApiError("Invalid or expired session. Please log in again.", 401);

  const userExists = await User.exists({ _id: userId });
  if (!userExists) throw new ApiError("User account not found", 404);

  req.userId = userId._id;
  next();
});

export { validateUser };
