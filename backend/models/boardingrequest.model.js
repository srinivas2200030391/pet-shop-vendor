import mongoose from "mongoose";

const BoardingRequestSchema = new mongoose.Schema({
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

const BoardingRequest = mongoose.model("BoardingRequest", BoardingRequestSchema);
export default BoardingRequest;
