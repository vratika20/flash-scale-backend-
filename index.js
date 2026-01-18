import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5433,
});

// ONE simple API
app.post("/order", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const updateResult = await pool.query(
      "UPDATE products SET stock = stock - 1 WHERE product_id = $1 AND stock > 0",
      [productId]
    );

    if (updateResult.rowCount === 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    await pool.query(
      "INSERT INTO orders (user_id, product_id, status) VALUES ($1, $2, $3)",
      [userId, productId, "SUCCESS"]
    );

    res.json({ message: "Order placed safely" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
