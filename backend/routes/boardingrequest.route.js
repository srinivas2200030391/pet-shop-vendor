import express from "express";
const router = express.Router();
import boardingRequestController from "../controllers/boardingrequest.controller.js";

router.get("/", boardingRequestController.getAllBoardingRequests);
router.post("/", boardingRequestController.addBoardingRequest);
router.put("/:id", boardingRequestController.updateBoardingRequest);
router.delete("/:id", boardingRequestController.deleteBoardingRequest);
router.get("/:id", boardingRequestController.getBoardingRequest);

export default router;
