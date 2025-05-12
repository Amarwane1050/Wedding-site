import mongoose from 'mongoose';

const weddingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
});

export default mongoose.model('Wedding', weddingSchema);
