import foodModel from "../models/foodModel.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.join(__dirname, "../uploads")

//add food item
const addFood = async (req, res) => {
    try {
        // Guard: multer sets req.file only if a file was actually uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required. Make sure you send it as form-data with the key 'image'." });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });

    } catch (error) {
        console.error("addFood error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// all food list
const listFood = async(req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error fetching foods"})
    }
}


//remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        // Delete the image file from disk
        fs.unlink(path.join(uploadsDir, food.image), (err) => {
            if (err) console.error("Failed to delete image:", err.message);
        });
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
}
export { addFood ,listFood, removeFood}
