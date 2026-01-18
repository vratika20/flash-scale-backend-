import { decrementStock } from "../services/stock.service.js";
import pool from "../db/index.js";

export const placeOrder = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const stockLeft = await decrementStock(productId);

    if (stockLeft < 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    await pool.query(
      "INSERT INTO orders(user_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    res.json({
      message: "Order placed",
      stockLeft,
    });
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
};
