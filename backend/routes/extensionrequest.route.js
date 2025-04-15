import express from "express";
const router = express.Router();
import extensionRequestController from "../controllers/extensionrequest.controller.js";

router.get("/", extensionRequestController.getAllExtensionRequests);
router.post("/", extensionRequestController.addExtensionRequest);

export default router;
