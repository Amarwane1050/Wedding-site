import mongoose from 'mongoose';

const taskListSchema = new mongoose.Schema({
  weddingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Wedding'  // référence au modèle Wedding si tu en as un
  },
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const TaskList = mongoose.model('TaskList', taskListSchema);

export default TaskList;
