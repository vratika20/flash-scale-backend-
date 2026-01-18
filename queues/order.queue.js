import redis from "../config/redis.js";

const ORDER_QUEUE = "order_queue";

export async function pushOrderToQueue(order) {
  await redis.rpush(ORDER_QUEUE, JSON.stringify(order));
}

export async function popOrderFromQueue() {
  return await redis.lpop(ORDER_QUEUE);
}
