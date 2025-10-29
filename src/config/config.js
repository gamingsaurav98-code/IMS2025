import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  version: process.env.VERSION || "0.0.1",
  status:"ok",
  name: process.env.NAME || "IMS202506",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/IMS202506",
};

export default config;
