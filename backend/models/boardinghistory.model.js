import mongoose from "mongoose";

const BoardingHistorySchema = new mongoose.Schema({
  customer: String,
  petName: String,
  cage: { type: mongoose.Schema.Types.ObjectId, ref: "Cage" },
  checkInDate: Date,
  checkOutDate: Date,
  duration: Number,
  totalCost: Number,
});

const BoardingHistory = mongoose.model("BoardingHistory", BoardingHistorySchema);
export default BoardingHistory;
