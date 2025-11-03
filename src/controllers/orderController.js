import orderService from "../services/orderService.js";

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getOrderById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const data = await orderService.getOrderById(customerId);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createOrder = async (req, res) => {
  const input = req.body;

  if (!input.orderItems || !input.orderItems.length) {
    return res.status(400).send("Order items are required.");
  }

  try {
    const data = await orderService.createOrder(req.body);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const data = await orderService.updateOrder(
      req.params.id,
      req.body,
    );

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.idr);

    res.send("Order deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};



export default {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  
  updateOrder,
};
