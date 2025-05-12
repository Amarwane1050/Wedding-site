import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();

// 🔹 GET - Lire tous les invités
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 POST - Créer un invité
router.post('/', async (req, res) => {
  try {
    const { name, rsvp, status } = req.body;
    const guest = new Guest({ name, rsvp, status });
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 GET - Lire un invité par ID
router.get('/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Invité non trouvé' });
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 PUT - Modifier un invité
router.put('/:id', async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGuest) return res.status(404).json({ message: 'Invité non trouvé' });
    res.json(updatedGuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 DELETE - Supprimer un invité
router.delete('/:id', async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ message: 'Invité non trouvé' });
    res.json({ message: 'Invité supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


