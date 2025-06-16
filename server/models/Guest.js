// models/Guest.js
import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rsvp: String,
  status: String,
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', required: true },
});

export default mongoose.model('Guest', guestSchema);



