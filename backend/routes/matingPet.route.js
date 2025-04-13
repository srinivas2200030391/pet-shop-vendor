import express from "express";
import { addMatingPet, getMatingPetsByVendor, updateAvailability } from "../controllers/matingPet.controller.js";
import { protectroute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectroute, addMatingPet); // Add new mating pet
router.get("/:vendorId", protectroute, getMatingPetsByVendor); // List vendor's pets
router.patch("/availability/:petId", protectroute, updateAvailability); // Update availability

export default router;
