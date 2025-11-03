import authRoutes from "./routes/authRoute.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import express from "express";
import multer from "multer";
import customerRoutes from "./routes/customerRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "0.0.1";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });


connectDB();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    version: config.version,
    port: config.port,
  });
});


app.use("/api/customers", auth, customerRoutes);
app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/orders", auth, orderRoutes);
app.use("/api/auth",  authRoutes);


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}....`);
});
