import Guest from '../models/Guest.js';

// ✅ Récupérer tous les invités d’un mariage spécifique
export const getAllGuests = async (req, res) => {
  const { wedding } = req.query;
  try {
    const guests = await Guest.find({ wedding });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des invités', error });
  }
};

// ✅ Ajouter un invité à un mariage
export const addGuest = async (req, res) => {
  const { name, rsvp, status, wedding } = req.body;
  try {
    const guest = new Guest({ name, rsvp, status, wedding });
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l’ajout de l’invité', error });
  }
};

// ✅ Mettre à jour un invité
export const updateGuest = async (req, res) => {
  const { id } = req.params;
  const { name, rsvp, status } = req.body;
  try {
    const guest = await Guest.findByIdAndUpdate(
      id,
      { name, rsvp, status },
      { new: true }
    );
    res.json(guest);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// ✅ Supprimer un invité
export const deleteGuest = async (req, res) => {
  const { id } = req.params;
  try {
    await Guest.findByIdAndDelete(id);
    res.json({ message: 'Invité supprimé' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error });
  }
};
