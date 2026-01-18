import redis from "../config/redis.js";

const init = async () => {
  await redis.set("product:1:stock", 10);
  console.log("Stock initialized");
};

init();
