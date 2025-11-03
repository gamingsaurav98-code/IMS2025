import express from "express";
import orderController from "../controllers/orderController.js";


const router = express.Router();

// URL: /api/orders/:id
router.get("/:id", orderController.getOrderById);

router.post("/", orderController.createOrder);

// URL: /api/orders
router.get("/", orderController.getOrders);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);


export default router;
