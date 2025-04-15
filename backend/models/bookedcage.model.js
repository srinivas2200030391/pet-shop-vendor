import mongoose from "mongoose";

const BookedCageSchema = new mongoose.Schema({
  cage: { type: mongoose.Schema.Types.ObjectId, ref: "Cage" },
  customer: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
});

const BookedCage = mongoose.model("BookedCage", BookedCageSchema);

export default BookedCage;
