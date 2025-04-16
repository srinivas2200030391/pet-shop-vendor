import mongoose from "mongoose";

const AboutPetSchema = new mongoose.Schema({
  images: { type: [String], required: true }, // changed from image + better typing
  breed: { type: String, required: true }, // fixed typo from Bread
  name: { type: String, required: true },
  details: { type: String, required: true },
  group: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  status: {
    type: String,
    enum: ["Available", "UnAvailable"],
    default: "Available",
  },
  lifeSpan: { type: String, required: true }, // camelCase
  characteristics: { type: String, required: true }, // camelCase + plural
});

const AboutPet = mongoose.model("AboutPet", AboutPetSchema);

export default AboutPet;
