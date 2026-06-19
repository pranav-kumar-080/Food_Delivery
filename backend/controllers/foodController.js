import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload buffer to Cloudinary and return secure URL
const uploadToCloudinary = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "food-delivery", public_id: `${Date.now()}_${filename}` },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

// Add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required." });
        }

        // Upload image buffer to Cloudinary
        const imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: imageUrl,           // Store full Cloudinary URL
            category: req.body.category,
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });

    } catch (error) {
        console.error("addFood error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching foods" });
    }
};

// Remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Delete image from Cloudinary if it's a Cloudinary URL
        if (food.image && food.image.includes("cloudinary.com")) {
            const publicId = food.image.split("/").slice(-2).join("/").replace(/\.[^/.]+$/, "");
            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };
