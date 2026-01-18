import dotenv from "dotenv";
dotenv.config();

import { Redis } from "@upstash/redis";

console.log("Loading Upstash REST Redis...");
console.log("REST URL:", process.env.UPSTASH_REDIS_REST_URL);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
