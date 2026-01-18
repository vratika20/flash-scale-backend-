import redis from "../config/redis.js";

const run = async () => {
  await redis.set("test", "upstash works");
  const value = await redis.get("test");
  console.log("Redis value:", value);
};

run();
