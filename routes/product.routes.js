import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// ✅ USER: Fetch all products
router.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT product_id, name, stock, total_stock, image FROM products"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
