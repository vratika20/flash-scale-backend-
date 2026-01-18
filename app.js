import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", orderRoutes);
app.use("/", productRoutes);
app.use("/", adminRoutes);

export default app;
