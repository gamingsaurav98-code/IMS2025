
import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import {  ADMIN } from "../constants/roles.js";



const router = express.Router();

//URL: /api/orders
router.post("/", auth,  orderController.createOrder);
router.get("/", auth, roleBasedAuth([ADMIN]), orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete(
  "/:id",
  auth,
  roleBasedAuth([ADMIN]),
  orderController.deleteOrder
);




export default router;
