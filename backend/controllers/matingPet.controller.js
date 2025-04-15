import MatingPet from "../models/matingPet.model.js";

// Add new mating pet
export const addMatingPet = async (req, res) => {
  try {
    const newPet = new MatingPet(req.body);
    await newPet.save();
    res.status(201).json({ message: "Mating pet added", pet: newPet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all mating pets for a vendor
export const getMatingPetsByVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const pets = await MatingPet.find({ vendor: vendorId });
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update full mating pet data
export const updateMatingPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const updatedPet = await MatingPet.findByIdAndUpdate(
      petId,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Mating pet updated", pet: updatedPet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete mating pet
export const deleteMatingPet = async (req, res) => {
  try {
    const { petId } = req.params;
    await MatingPet.findByIdAndDelete(petId);
    res.status(200).json({ message: "Mating pet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

