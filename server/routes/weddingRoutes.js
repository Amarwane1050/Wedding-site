import express from 'express';
import Wedding from '../models/Wedding.js';

const router = express.Router();

// GET tous les mariages
router.get('/', async (req, res) => {
  try {
    const weddings = await Wedding.find();
    res.json(weddings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST créer un mariage
router.post('/', async (req, res) => {
  try {
    const { brideName, groomName, date, location } = req.body;
    const newWedding = new Wedding({ brideName, groomName, date, location });
    const savedWedding = await newWedding.save();
    res.status(201).json(savedWedding);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création' });
  }
});

// PUT modifier un mariage
router.put('/:id', async (req, res) => {
  try {
    const { brideName, groomName, date, location } = req.body;
    const updatedWedding = await Wedding.findByIdAndUpdate(
      req.params.id,
      { brideName, groomName, date, location },
      { new: true }
    );
    res.json(updatedWedding);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// DELETE supprimer un mariage
router.delete('/:id', async (req, res) => {
  try {
    await Wedding.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mariage supprimé' });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la suppression' });
  }
});

export default router;
