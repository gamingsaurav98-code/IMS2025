import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
  },

  brand: String,

  category: {
    type: String,
    required: [true, "Please provide product category"],
  },

  stock: {
    type: Number,
    required: [true, "Please provide product stock"],
    min: [0, "Stock cannot be negative"],
    max: [10000, "Stock cannot exceed 1000 units"],
  },

  price: {
    type: Number,
    required: [true, "Please provide product price"],
    min: [0, "Price cannot be negative"],
    max: [1000000, "Price cannot exceed 1,000,000"],
  },

  imageUrls: [String],

  description: String,

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Created by user id is required. "],
  },
});    

const model = mongoose.model("Product", productSchema); 

export default model;