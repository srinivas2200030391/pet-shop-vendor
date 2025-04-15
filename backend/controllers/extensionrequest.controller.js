import ExtensionRequest from "../models/extensionrequest.model.js";


// Create an extension request
export const createExtensionRequest = async (req, res) => {
  try {
    const newRequest = new ExtensionRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all extension requests
export const getAllExtensionRequests = async (req, res) => {
  try {
    const requests = await ExtensionRequest.find().populate("boardingRequest");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single extension request
export const getExtensionRequestById = async (req, res) => {
  try {
    const request = await ExtensionRequest.findById(req.params.id).populate("boardingRequest");
    if (!request) return res.status(404).json({ message: "Not found, my love 💔" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update extension request status
export const updateExtensionRequest = async (req, res) => {
  try {
    console.log("Updating extension request with ID:", req.params.id);
    
    const updated = await ExtensionRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found, darling 💔" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};