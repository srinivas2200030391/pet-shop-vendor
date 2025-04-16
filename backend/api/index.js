import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "../lib/db.js";
import matingPetRoutes from "../routes/matingPet.route.js";
import cageRoutes from "../routes/cage.route.js";
import bookedCageRoutes from "../routes/bookedCage.route.js";
import boardingRequestRoutes from "../routes/boardingrequest.route.js";
import boardingHistoryRoutes from "../routes/boardinghistory.route.js";
import extensionRequestRoutes from "../routes/extensionrequest.route.js";
import aboutPetRoute from "../routes/aboutpet.route.js";
import vendorRoutes from "../routes/auth.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

connectDB();

app.use("/api/vendors", vendorRoutes);
app.use("/api/cages", cageRoutes);
app.use("/api/bookedCages", bookedCageRoutes);
app.use("/api/boardingrequests", boardingRequestRoutes);
app.use("/api/boardingHistories", boardingHistoryRoutes);
app.use("/api/aboutpet", aboutPetRoute);
app.use("/api/vendors", vendorRoutes); 
app.use("/api/matingpets", matingPetRoutes);  
app.use("/api/extensions", extensionRequestRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
