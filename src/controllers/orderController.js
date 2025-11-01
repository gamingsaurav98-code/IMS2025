import orderService from "../services/orderService.js";  




const createOrder = async (req, res) => {
  const input = req.body;
 
  if (!input.orderItems || !input.orderItems.length ) {
    return res.status(400).send("Order Items are required. ");
  }


  try {
    const data = await orderService.createOrder(req.body, req.user.id);  
   

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  } 
};
  
const getOrders = async (req, res) => {
   try{
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
    } catch (error){
        res.status(500).send(error.message);
    }

};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderService.getOrderById(id); 
    if (!order) {
      return res.status(404).send("order not found");
    }   
    res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);   
        res.status(500).send(error.message);
    }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
    try {
        const data = await orderService.updateOrder(id, req.body);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        await orderService.deleteOrder(id);

        res.status(200).send("order deleted successfully");
    } catch (error) {
        res.status(500).send("order not deleted");
    }
};








export default {
 
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
 
};  

