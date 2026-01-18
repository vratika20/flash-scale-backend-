import { pushOrderToQueue } from "../queues/order.queue.js";

export const createOrder = async (req, res) => {
  const { userId, productId } = req.body;

  await pushOrderToQueue({
    userId,
    productId,
    createdAt: Date.now(),
  });

  return res.status(202).json({
    message: "Order queued successfully",
  });
};
