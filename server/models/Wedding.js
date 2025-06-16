// models/weddingModel.js
import mongoose from 'mongoose';

const weddingSchema = new mongoose.Schema({
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
});

export default mongoose.model('Wedding', weddingSchema);

