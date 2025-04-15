import mongoose from "mongoose";

const ExtensionRequestSchema = new mongoose.Schema({
  customer: String,
  petName: String,
  petType: String,
  startDate: Date,
  endDate: Date,
  totalCost: Number,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const ExtensionRequest = mongoose.model("ExtensionRequest", ExtensionRequestSchema);
export default ExtensionRequest;
