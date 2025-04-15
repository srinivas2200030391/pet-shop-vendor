import ExtensionRequest from "../models/extensionrequest.model.js";

// Get all extension requests
const ExtensionRequestController = {
  getAllExtensionRequests : async (req, res) => {
    try {
      const requests = await ExtensionRequest.find();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add an extension request
  addExtensionRequest : async (req, res) => {
    try {
      const { customer, petName, petType, startDate, endDate, totalCost } =
        req.body;
      const extensionRequest = new ExtensionRequest({
        customer,
        petName,
        petType,
        startDate,
        endDate,
        totalCost,
      });
      await extensionRequest.save();
      res.status(201).json(extensionRequest);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

}
export default ExtensionRequestController;