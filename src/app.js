import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import express from "express";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import multer from "multer";
import userRoutes from "./routes/userRoute.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import roleBasedAuth from "./middlewares/roleBasedAuth.js";
import { ADMIN } from "./constants/roles.js";
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

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/orders", orderRoutes);


app.use("/api/users", auth, roleBasedAuth(ADMIN), userRoutes);
app.use("/api/auth",  authRoutes);


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}....`);
});
