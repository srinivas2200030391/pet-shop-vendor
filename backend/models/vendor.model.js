import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vendorShopName: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
    unique: true,
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {  // ➕ Add this
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
