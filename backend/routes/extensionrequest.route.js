import express from "express";
import {
  createExtensionRequest,
  getAllExtensionRequests,
  getExtensionRequestById,
  updateExtensionRequest,
  deleteExtensionRequest
} from "../controllers/extensionrequest.controller.js";

const router = express.Router();

router.post("/", createExtensionRequest);
router.get("/", getAllExtensionRequests);
router.get("/:id", getExtensionRequestById);
router.put("/:id", updateExtensionRequest);
router.delete("/:id",deleteExtensionRequest)

export default router;
