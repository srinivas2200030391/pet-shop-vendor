import mongoose from "mongoose";

const ExtensionRequestSchema = new mongoose.Schema({
  boardingRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BoardingRequest",
    required: true,
  },
  requestedEndDate: {
    type: Date,
    required: true,
  },
  reason: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

const ExtensionRequest = mongoose.model(
  "ExtensionRequest",
  ExtensionRequestSchema
);
export default ExtensionRequest;
