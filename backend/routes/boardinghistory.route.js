import express from "express";
const router = express.Router();
import BoardingHistoryController from "../controllers/boardinghistory.controller.js";

router.get("/", BoardingHistoryController.getAllBoardingHistories);
router.post("/", BoardingHistoryController.addBoardingHistory);

export default router;
