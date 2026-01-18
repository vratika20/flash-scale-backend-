import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/order", rateLimiter,createOrder);

export default router;
