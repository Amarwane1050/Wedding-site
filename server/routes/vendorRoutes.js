import express from 'express';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// GET - Tous les prestataires
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un prestataire
router.post('/', async (req, res) => {
  try {
    const { name, type, contact } = req.body;
    const vendor = new Vendor({ name, type, contact });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Prestataire par ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Prestataire non trouvé' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Modifier un prestataire
router.put('/:id', async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVendor) return res.status(404).json({ message: 'Prestataire non trouvé' });
    res.json(updatedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer un prestataire
router.delete('/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ message: 'Prestataire non trouvé' });
    res.json({ message: 'Prestataire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

