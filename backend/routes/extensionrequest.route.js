import express from "express";
import {
  createExtensionRequest,
  getAllExtensionRequests,
  getExtensionRequestById,
  updateExtensionRequest,
} from "../controllers/extensionrequest.controller.js";

const router = express.Router();

router.post("/", createExtensionRequest);
router.get("/", getAllExtensionRequests);
router.get("/:id", getExtensionRequestById);
router.put("/:id", updateExtensionRequest);

export default router;
