import redis from "../config/redis.js";
import pool from "../db/db.js";

const QUEUE = "order_queue";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

console.log("Order worker started...");

while (true) {
  try {
    const job = await redis.lpop(QUEUE);

    if (!job) {
      await sleep(1000);
      continue;
    }

    const order = JSON.parse(job);
    const { userId, productId } = order;

    await pool.query(
      "INSERT INTO orders (user_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    console.log("Order processed:", order);
  } catch (err) {
    console.error("Worker error:", err);
    await sleep(1000);
  }
}
