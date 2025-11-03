import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    const status = await mongoose.connect(
   config.mongodbUri
    );
    console.log(`MongoDB connected successfully: ${status.connection.host}`);

  } catch (error) {
    console.error("Failed to connect to MongoDB", error); 

    process.exit(1);    
  }
}

export default connectDB;
