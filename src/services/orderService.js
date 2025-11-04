import Order from "../models/Order.js";
import Product from "../models/Product.js";
import crypto from "crypto";
import mongoose from "mongoose";


const getOrders = async () => {
  const orders = await Order.find();

  return orders;
};



const getOrderById = async (customerId) => {
  // Convert string param to ObjectId
  const order = await Order.find({
    customer: new mongoose.Types.ObjectId(customerId),
  });

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  return order;
};

const createOrder = async (data) => {
  const orderNumber = crypto.randomUUID();

  // Loop through all order items and update their stock
 for (const item of data.orderItems) {

    await updateProductStock(item.productId, item.quantity);

  }
  return await Order.create({ ...data,  orderNumber });
};



const updateProductStock = async (productId,quantity) => {
  const product = await Product.findByIdAndUpdate(productId);
 


  if (Product.stock < quantity) {
    throw new Error("Not enough stock available");
  }

  Product.stock -= quantity;
  await product.save();

  return product;
};


const updateOrder = async (id, data) => {
  const order = await getOrderById(id);



  return await Order.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true }
  );
};

const deleteOrder = async (id) => {
  const order = await getOrderById(id);

  return await Order.findByIdAndDelete(id);
};



export default {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,

};
