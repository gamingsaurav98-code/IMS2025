import authController from "../controllers/authController.js";


import express from "express";


const router = express.Router();


// URL: /api/auth/register
router.post("/register", authController.register);
router.post("/login", authController.login);


export default router;
