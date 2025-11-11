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
import cors from "cors";

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "0.0.1";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

// CORS Configuration
// Allow local dev origins and the configured FRONTEND_URL. In development allow any origin to speed iteration.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like server-to-server, curl)
    if (!origin) return callback(null, true);
    // In development allow all origins for convenience
    if (process.env.NODE_ENV !== "production") return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

connectDB();
connectCloudinary();

app.use(cors(corsOptions));
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
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}....`);
});
