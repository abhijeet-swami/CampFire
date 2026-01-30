import { getRedisClient } from "../configs/redis.config.js";
import ApiError from "../utils/ApiError.util.js";

const WINDOW = 60;
const LIMIT = 40;

const rateLimit = async (req, res, next) => {
  try {
    const identifier = req.ip;
    const key = `rate_limit:${identifier}`;

    const redisClient = getRedisClient();
    if (!redisClient) return next();

    const current = await redisClient.incr(key);

    if (current === 1) await redisClient.expire(key, WINDOW);
    if (current > LIMIT) return next(new ApiError("Too many requests", 429));

    next();
  } catch (error) {
    console.error("Rate limit error:", error.message);
    next();
  }
};

export default rateLimit;
