import jwt from "jsonwebtoken";
import config from "../configs/env.config.js";

const genrateToken = (userId) => {
  return jwt.sign(
    {
      _id: userId,
    },
    config.jwt_secret,
    {
      expiresIn: "7d",
    },
  );
};

const decodeToken = (token) => {
  return jwt.verify(token, config.jwt_secret);
};

export { genrateToken, decodeToken };
