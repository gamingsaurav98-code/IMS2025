import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

// URL: /api/customers
router.post("/", customerController.createCustomer);

// URL: /api/customers
router.get("/", customerController.getCustomers);

// URL: /api/customers/:id
router.get("/:id", customerController.getCustomerById);

// URL: /api/customers/:id
router.put("/:id", customerController.updateCustomer);

// URL: /api/customers/:id
router.delete("/:id", customerController.deleteCustomer);



 


export default router;
