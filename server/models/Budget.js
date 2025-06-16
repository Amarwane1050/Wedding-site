import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false }
});

export default mongoose.model('Budget', budgetSchema);




