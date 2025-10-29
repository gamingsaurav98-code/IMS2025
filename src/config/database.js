import mongoose from "mongoose";
import cpnfig from "./config.js";

async function connectDB() {
  try {
    const status = await mongoose.connect(
   cpnfig.mongodbUri
    );
    console.log(`MongoDB connected successfully: ${status.connection.host}`);

  } catch (error) {
    console.error("Failed to connect to MongoDB", error); 

    process.exit(1);    
  }
}

export default connectDB;
