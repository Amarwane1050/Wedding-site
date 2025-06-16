import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', required: true },
  name: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: false },
  price: { type: Number, required: false },
});

export default mongoose.model('Vendor', vendorSchema);
