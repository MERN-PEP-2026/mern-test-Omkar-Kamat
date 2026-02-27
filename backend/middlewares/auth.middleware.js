import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = {
      id: user._id,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};