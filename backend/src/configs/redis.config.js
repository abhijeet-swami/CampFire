import { createClient } from "redis";
import config from "../configs/env.config.js";

let redisClient = null;

const connectRedis = async () => {
  if (redisClient) return redisClient;

  try {
    redisClient = createClient({
      url: config.REDIS.url,
    });

    redisClient.on("error", (error) => {
      console.error("Redis Client Error:", error.message);
    });

    await redisClient.connect();
    console.log("Redis connected");
    return redisClient;
  } catch (error) {
    console.warn("Redis connection failed. Continuing without Redis.");
    redisClient = null;
    return null;
  }
};

const getRedisClient = () => redisClient;

export { connectRedis, getRedisClient };
