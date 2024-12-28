import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.u_at;
        if(!token) {
            return res.status(401).json({ success: false, error: "Unauthorized", checkpoint: 1 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ success: false, error: "Unauthorized", checkpoint: 2 });
        }

        const user = await UserModel.findById(decoded.uid).select("-password");

        if(!user) {
            return res.status(404).json({ success: false, error: "Unauthorized", checkpoint: 3 });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        const devError = process.env.NODE_ENV !== "development" ? "Internal server error" : error.message;
        res.status(500).json({ success: false, error: devError });
    }
}

export default protectRoute;