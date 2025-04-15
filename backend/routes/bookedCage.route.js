import express from "express";
const router = express.Router();
import bookedCageController from "../controllers/bookedcage.controller.js";

router.get("/", bookedCageController.getAllBookedCages);
router.post("/", bookedCageController.addBookedCage);

export default router;
