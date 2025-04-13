import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "../lib/db.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Pet Mating API!");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
