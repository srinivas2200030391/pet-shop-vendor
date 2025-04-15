import express from "express";
import { addMatingPet, getMatingPetsByVendor, updateMatingPet,deleteMatingPet } from "../controllers/matingPet.controller.js";
import { protectroute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", addMatingPet); // Add new mating pet
router.get("/:vendorId",  getMatingPetsByVendor); // List vendor's pets
router.patch("/availability/:petId", updateMatingPet); // Update availability
router.delete("/:petId", deleteMatingPet); // Delete mating pet

export default router;
