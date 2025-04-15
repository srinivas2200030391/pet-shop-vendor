import express from "express";
const router = express.Router();
import boardingRequestController from "../controllers/boardingrequest.controller.js";

router.get("/", boardingRequestController.getAllBoardingRequests);
router.post("/", boardingRequestController.addBoardingRequest);

export default router;
