import Order from "../models/Order.js";
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

  return await Order.create({ ...data, orderNumber });
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
