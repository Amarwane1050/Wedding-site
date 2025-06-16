import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();

// GET guests by weddingId
router.get('/wedding/:weddingId', async (req, res) => {
  try {
    const guests = await Guest.find({ weddingId: req.params.weddingId });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST guest with weddingId
router.post('/', async (req, res) => {
  try {
    const { name, rsvp, status, weddingId } = req.body;
    const guest = new Guest({ name, rsvp, status, weddingId });
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guest deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;







