import express from 'express';
import TaskList from '../models/TaskList.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST - créer une nouvelle tâche
router.post('/', protect, async (req, res) => {
  try {
    const { weddingId, name, done } = req.body;
    if (!weddingId || !name) {
      return res.status(400).json({ message: 'weddingId et name sont requis' });
    }

    const newTask = new TaskList({
      weddingId,
      name,
      done: done || false,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET - récupérer toutes les tâches d’un mariage
router.get('/:weddingId', protect, async (req, res) => {
  try {
    const tasks = await TaskList.find({ weddingId: req.params.weddingId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;
