import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// GET - Tous les postes budgétaires
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un poste budgétaire
router.post('/', async (req, res) => {
  try {
    const { item, amount, status } = req.body;
    const budget = new Budget({ item, amount, status });
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Poste budgétaire par ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Poste non trouvé' });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Modifier un poste budgétaire
router.put('/:id', async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBudget) return res.status(404).json({ message: 'Poste non trouvé' });
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer un poste budgétaire
router.delete('/:id', async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ message: 'Poste non trouvé' });
    res.json({ message: 'Poste supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
