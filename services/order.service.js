import pool from "../db/db.js";

export const placeOrder = async (userId, productId) => {
  // Safe stock reduction
  const updateResult = await pool.query(
    "UPDATE products SET stock = stock - 1 WHERE product_id = $1 AND stock > 0",
    [productId]
  );

  if (updateResult.rowCount === 0) {
    return { success: false, message: "Out of stock" };
  }

  await pool.query(
    "INSERT INTO orders (user_id, product_id, status) VALUES ($1, $2, $3)",
    [userId, productId, "SUCCESS"]
  );

  return { success: true };
};
