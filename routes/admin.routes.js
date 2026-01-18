import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// ==========================
// ✅ UPDATE STOCK (ADMIN)
// ==========================
router.put("/admin/product/:id/stock", async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    await pool.query("UPDATE products SET stock = $1 WHERE product_id = $2", [
      stock,
      id,
    ]);

    res.json({ message: "Stock updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

// ==========================
// ✅ ADD PRODUCT (ADMIN)
// ==========================
router.post("/admin/product", async (req, res) => {
  const { name, stock, image } = req.body;

  if (!name || stock == null || !image) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (name, stock, total_stock, image)
       VALUES ($1, $2, $2, $3)
       RETURNING *`,
      [name, stock, image]
    );

    res.json({
      message: "Product added successfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add product failed" });
  }
});

export default router;
