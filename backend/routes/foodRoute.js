import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const foodRouter = express.Router();

// Use memory storage — no disk writes, works on Vercel serverless
const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post("/add", adminAuthMiddleware, upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove", adminAuthMiddleware, removeFood);






export default foodRouter