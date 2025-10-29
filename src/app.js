import express from "express";
import config from "./config/config.js";
import productRoutes from "./routes/productRoute.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "0.0.1";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    version: config.version,
    port: config.port,
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}....`);
});
