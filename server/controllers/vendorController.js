import Vendor from '../models/Vendor.js';

// Récupérer tous les prestataires d'un mariage
export const getVendorsByWedding = async (req, res) => {
  try {
    const vendors = await Vendor.find({ weddingId: req.params.weddingId });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération prestataires', error });
  }
};

// Créer un prestataire
export const createVendor = async (req, res) => {
  const { weddingId, name, service, contact, price } = req.body;
  try {
    const newVendor = new Vendor({ weddingId, name, service, contact, price });
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création prestataire', error });
  }
};

// Mettre à jour un prestataire
export const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour prestataire', error });
  }
};

// Supprimer un prestataire
export const deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prestataire supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression prestataire', error });
  }
};
