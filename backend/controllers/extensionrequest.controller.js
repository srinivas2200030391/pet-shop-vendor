import ExtensionRequest from "../models/extensionboardingrequest.model.js";
import BoardingRequest from "../models/boardingrequest.model.js";
// Create an extension request
import mongoose from "mongoose";

export const createExtensionRequest = async (req, res) => {
  try {
    const { boardingRequest, requestedEndDate, reason, status, requestedAt } =
      req.body;
    console.log("📦 Incoming boardingRequest:", boardingRequest);

    const newRequest = new ExtensionRequest({
      boardingRequest: new mongoose.Types.ObjectId(boardingRequest), // 💫 This is the magic touch
      requestedEndDate,
      reason,
      status,
      requestedAt,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    console.error("💥 Error creating extension request:", err.message);
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
    const request = await ExtensionRequest.findById(req.params.id).populate(
      "boardingRequest"
    );
    if (!request)
      return res.status(404).json({ message: "Not found, my love 💔" });
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
    // now in boardingRequest model, we have to update the status of the boarding request as well along with the dates
    console.log(updated.boardingRequest._id);
    
    const boardingRequest = await BoardingRequest.findById(
      updated.boardingRequest._id
    );
    if (!boardingRequest) {
      return res.status(404).json({ message: "Boarding request not found" });
    }
    boardingRequest.status = updated.status;
    boardingRequest.endDate = updated.requestedEndDate; // Update the end date if needed
    await boardingRequest.save();
    console.log("Updated boarding request status:", boardingRequest.status);
    // remove the record from extension request model
    await ExtensionRequest.findByIdAndDelete(req.params.id);
    console.log("Deleted extension request with ID:", req.params.id);

    if (!updated)
      return res.status(404).json({ message: "Not found, darling 💔" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExtensionRequest = async (req, res) => {
  try {
    const deleted = await ExtensionRequest.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Not found, darling 💔" });
    res.json({ message: "Extension request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
