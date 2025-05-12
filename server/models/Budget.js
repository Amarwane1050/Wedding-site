import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['planned', 'paid', 'pending'], default: 'planned' }
});

export default mongoose.model('Budget', budgetSchema);
