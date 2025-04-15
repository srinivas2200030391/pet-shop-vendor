// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.model.js";

export const protectroute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // ✅ this must match the name in res.cookie()

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // optional: store in req.user or req.vendor
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
