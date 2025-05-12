import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  contact: String
});

export default mongoose.model('Vendor', vendorSchema);
