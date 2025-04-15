import BookedCage from "../models/bookedcage.model.js";

// Get all booked cages
const BookedCageController = {
  getAllBookedCages : async (req, res) => {
    try {
      const bookedCages = await BookedCage.find().populate("cage");
      res.json(bookedCages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add a booked cage
  addBookedCage : async (req, res) => {
    try {
      const { cage, customer, petName, petType, startDate, endDate, totalCost } =
        req.body;
      const bookedCage = new BookedCage({
        cage,
        customer,
        petName,
        petType,
        startDate,
        endDate,
        totalCost,
      });
      await bookedCage.save();
      res.status(201).json(bookedCage);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

}

export default BookedCageController;