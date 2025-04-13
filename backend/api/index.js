import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "../lib/db.js";
import matingPetRoutes from "../routes/matingPet.route.js";


import vendorRoutes from "../routes/auth.route.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

connectDB();


app.use("/api/vendors", vendorRoutes);   

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
