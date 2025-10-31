import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import express from "express";
import userRoutes from "./routes/userRoute.js";


const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "0.0.1";

const app = express();

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    version: config.version,
    port: config.port,
  });
});


app.use("/api/users",  userRoutes);
app.use("/api/auth",  authRoutes);


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}....`);
});
