import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import {placeOrder,verifyOrder,userOrders,listOrders,updateStatus} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place",authMiddleware,placeOrder);
orderRoute.post("/verify",authMiddleware,verifyOrder);
orderRoute.post("/userOrders",authMiddleware,userOrders);
orderRoute.get("/list", adminAuthMiddleware, listOrders);
orderRoute.post("/status", adminAuthMiddleware, updateStatus);

export default orderRoute;