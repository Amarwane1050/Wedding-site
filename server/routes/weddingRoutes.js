import express from 'express';
import Wedding from '../models/Wedding.js';

const router = express.Router();

// GET - Tous les mariages
router.get('/', async (req, res) => {
  try {
    const weddings = await Wedding.find();
    res.json(weddings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un mariage
router.post('/', async (req, res) => {
  try {
    const { name, date, location } = req.body;
    const wedding = new Wedding({ name, date, location });
    await wedding.save();
    res.status(201).json(wedding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Un mariage par ID
router.get('/:id', async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.id);
    if (!wedding) return res.status(404).json({ message: 'Mariage non trouvé' });
    res.json(wedding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Modifier un mariage
router.put('/:id', async (req, res) => {
  try {
    const updatedWedding = await Wedding.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWedding) return res.status(404).json({ message: 'Mariage non trouvé' });
    res.json(updatedWedding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer un mariage
router.delete('/:id', async (req, res) => {
  try {
    const deletedWedding = await Wedding.findByIdAndDelete(req.params.id);
    if (!deletedWedding) return res.status(404).json({ message: 'Mariage non trouvé' });
    res.json({ message: 'Mariage supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
