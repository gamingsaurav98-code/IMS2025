import authController from "../controllers/authController.js";


import express from "express";


const router = express.Router();


// URL: /api/auth/register
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


export default router;
