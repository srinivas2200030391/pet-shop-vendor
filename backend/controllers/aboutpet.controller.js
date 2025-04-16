import AboutPet from "../models/aboutpet.model.js";

const aboutPet = {
  createAbout: async (req, res) => {
    console.log("Request body:", req.body); // Log the request body
    
    const aboutPet = new AboutPet(req.body);
    try {
      await aboutPet.save();
      res.status(200).json("Product created successfully");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // Fetch all pets from database
  getAllAboutPet: async (req, res) => {
    try {
      const allPets = await AboutPet.find({});
      if (!allPets || allPets.length === 0) {
        return res.status(404).json("No pets found");
      }
      res.status(200).json(allPets);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getAllPets: async (req, res) => {
    try {
      const item = req.params.item;
      // capitalize the first letter of the item
      const category = item.charAt(0).toUpperCase() + item.slice(1);
      const itemDetails = await AboutPet.find({ category: category });
      if (!itemDetails || itemDetails.length === 0) {
        return res.status(404).json("No dogs found");
      }
      res.status(200).json(itemDetails);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getBreeds: async (req, res) => {
    try {
      // get pet breeds
      const { item } = req.params;
      console.log("Item parameter:", item); // Log the item parameter
      const allBreeds = await AboutPet.find({ category: item }).select("breed");

      if (!allBreeds || allBreeds.length === 0) {
        return res.status(404).json("No breeds found, love 🐾");
      }
      // Extract, filter, and deduplicate the Breed values
      const uniqueBreeds = [
        ...new Set(
          allBreeds
            .map((item) => item.breed)
            .filter((breed) => breed && breed.trim() !== "")
        ),
      ];

      res.status(200).json(uniqueBreeds);
    } catch (error) {
      res.status(500).json(`Server error, darling 💔: ${error.message}`);
    }
  },

  getPetByBreed: async (req, res) => {
    const { breed } = req.params;
    console.log("Breed parameter:", breed); // Log the breed parameter
    try {
      const pets = await AboutPet.find({ breed: breed });
      if (!pets || pets.length === 0) {
        return res.status(404).json("No pets found for this breed");
      }
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  addFieldsToAllPets: async (req, res) => {
    try {
      const body = req.body;

      const updateResult = await AboutPet.updateMany(
        {},
        {
          $set: {
            ...body,
          },
        }
      );

      res.status(200).json({
        message: "All records updated with age, gender, and price, my love 💖",
        result: updateResult,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong, darling 💔", error });
    }
  },
  updatePets: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateResult = await AboutPet.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updateResult) {
        return res.status(404).json("Pet not found");
      }
      res.status(200).json({
        message: "Pet updated successfully",
        result: updateResult,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },
  deletePets: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteResult = await AboutPet.findByIdAndDelete(id);
      if (!deleteResult) {
        return res.status(404).json("Pet not found");
      }
      res.status(200).json({
        message: "Pet deleted successfully",
        result: deleteResult,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },
};
export default aboutPet;
