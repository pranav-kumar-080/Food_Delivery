import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized — admin token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id !== "admin_static_id") {
            return res.json({ success: false, message: "Not authorized — invalid admin token" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid or expired admin token" });
    }
};

export default adminAuthMiddleware;