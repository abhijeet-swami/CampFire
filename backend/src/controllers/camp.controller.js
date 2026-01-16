import asyncWrapper from "../utils/asyncWrapper.util.js";
import Camp from "../models/camp.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import { decodeToken } from "../utils/token.util.js";
import { normalizeTitle, findDuplicate } from "../utils/duplicateCamp.util.js";

const createCamp = asyncWrapper(async (req, res) => {
  const token = req.cookies?.uid;
  const userId = decodeToken(token);
  const { title, description, category } = req.body;

  const campExist = await Camp.exists({ createdBy: userId });
  if (campExist) throw new ApiError("User already made a camp", 401);

  const titleExists = await findDuplicate(title);
  if (titleExists.length > 0) {
    console.log(titleExists);
    throw new ApiError("Similar camp exists", 401);
  }

  const keywords = normalizeTitle(title);

  const camp = new Camp({
    title,
    keywords,
    description,
    category,
    createdBy: userId,
    expiresAt: Date.now() + 100 * 600,
  });
  await camp.save();

  const user = await User.findById(userId);
  user.camps.push(camp._id);
  user.save();

  sendResponse(res, 201, "Camp created!");
});

export { createCamp };
