import express from "express";
import aboutPet from "../controllers/aboutpet.controller.js";

const router = express.Router();

router.post("/createaboutpet", aboutPet.createAbout);
router.get("/getallaboutpet", aboutPet.getAllAboutPet);
router.get("/getbreeds/:item", aboutPet.getBreeds);
router.put("/update-all-extension-requests", aboutPet.addFieldsToAllPets);
router.get("/getpetbybreed/:breed", aboutPet.getPetByBreed);
router.put("/updateaboutpet/:id", aboutPet.updatePets);
router.delete("/deleteaboutpet/:id", aboutPet.deletePets);
router.get("/:item", aboutPet.getAllPets);
export default router;
