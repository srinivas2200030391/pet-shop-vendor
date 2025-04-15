import BoardingHistory from "../models/boardinghistory.model.js";

// Get all boarding histories
const BoardingHistoryController = {
  getAllBoardingHistories : async (req, res) => {
    try {
      const histories = await BoardingHistory.find().populate("cage");
      res.json(histories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add a boarding history
  addBoardingHistory : async (req, res) => {
    try {
      const {
        customer,
        petName,
        cage,
        checkInDate,
        checkOutDate,
        duration,
        totalCost,
      } = req.body;
      const boardingHistory = new BoardingHistory({
        customer,
        petName,
        cage,
        checkInDate,
        checkOutDate,
        duration,
        totalCost,
      });
      await boardingHistory.save();
      res.status(201).json(boardingHistory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

}

export default BoardingHistoryController;