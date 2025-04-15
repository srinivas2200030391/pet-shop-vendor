import BoardingRequest from "../models/boardingrequest.model.js";

// Get all boarding requests
const BoardingRequestController = {
  getAllBoardingRequests : async (req, res) => {
    try {
      const requests = await BoardingRequest.find();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add a boarding request
  addBoardingRequest : async (req, res) => {
    try {
      const { customer, petName, petType, startDate, endDate, totalCost } =
        req.body;
      const boardingRequest = new BoardingRequest({
        customer,
        petName,
        petType,
        startDate,
        endDate,
        totalCost,
      });
      await boardingRequest.save();
      res.status(201).json(boardingRequest);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

}

export default BoardingRequestController;