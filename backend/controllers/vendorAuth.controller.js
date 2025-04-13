import bcrypt from "bcryptjs";
import Vendor from "../models/vendor.model.js";
import { generatetoken } from "../lib/utils.js";

export const vendorSignup = async (req, res) => {
  const { name, vendorShopName, sellerId, email, password } = req.body;
  try {
    if (!name || !vendorShopName || !sellerId || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newVendor = new Vendor({
      name,
      vendorShopName,
      sellerId,
      email,
      password: hashedPassword,
    });

    await newVendor.save();
    generatetoken(newVendor._id, res);

    res.status(201).json({
      id: newVendor._id,
      name: newVendor.name,
      vendorShopName: newVendor.vendorShopName,
      sellerId: newVendor.sellerId,
      email: newVendor.email,
      verificationStatus: newVendor.verificationStatus,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generatetoken(vendor._id, res);

    res.status(200).json({
      id: vendor._id,
      name: vendor.name,
      vendorShopName: vendor.vendorShopName,
      email: vendor.email,
      verificationStatus: vendor.verificationStatus,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const vendorLogout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const checkauth = async (req, res) => {
  try {
      // User is already verified by protectroute middleware
      const user = await Vendor.findById(req.user.id).select("-password");
      if (!user) {
          return res.status(401).json({ message: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Check auth error:", error);
      res.status(500).json({ message: "Server error" });
  }
};
