import Order from "../models/Order.js";

const createOrder = async (data, user) => {

const orderNumber = crypto.randomUUID();

  await Order.create({ ...data , user, orderNumber});
};

const getOrders = async () => {
  const orders = await Order.find()
  .populate("orderItems.product")
  .populate("user", ["name", "email", "phone", "address"]);
  return orders;
};

const getOrderById = async (id) => await Order.findById(id);

const updateOrder = async (id, data) => {
  const order = await Order.findByIdAndUpdate(id, data, { new: true });
  return order;
};

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
