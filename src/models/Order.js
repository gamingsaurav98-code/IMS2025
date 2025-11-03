import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order tracking number is required."],
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer id is required."],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required."],
      },
      quantity: { type: Number, default: 1 },
    },
  ],
 
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
 
});

const model = mongoose.model("Order", orderSchema);

export default model;
