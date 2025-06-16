import TaskList from '../models/TaskList.js';

// Ajouter une nouvelle tâche
export const addTask = async (req, res) => {
  const { weddingId, name } = req.body;

  if (!weddingId || !name) {
    return res.status(400).json({ message: 'weddingId et name sont requis' });
  }

  try {
    const newTask = new TaskList({ weddingId, name, done: false });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer les tâches liées à un mariage
export const getTasksByWedding = async (req, res) => {
  const { weddingId } = req.params;

  try {
    const tasks = await TaskList.find({ weddingId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
