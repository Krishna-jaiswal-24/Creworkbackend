import jwt from "jsonwebtoken";
import User from "./models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization header missing", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired", success: false });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token", success: false });
    } else {
      res.status(500).json({ message: "Server error", success: false });
    }
  }
};

export default authMiddleware;
