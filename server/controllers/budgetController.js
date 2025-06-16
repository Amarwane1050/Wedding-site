import Budget from '../models/Budget.js';

// GET budgets par weddingId
export const getBudgetsByWedding = async (req, res) => {
  try {
    const budgets = await Budget.find({ weddingId: req.params.weddingId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST créer un budget
export const createBudget = async (req, res) => {
  const { title, amount, paid, weddingId } = req.body;

  if (!title || !amount || !weddingId) {
    return res.status(400).json({ message: 'Données manquantes' });
  }

  try {
    const newBudget = new Budget({
      title,
      amount,
      paid: paid || false,
      weddingId,
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT modifier un budget
export const updateBudget = async (req, res) => {
  const { title, amount, paid, weddingId } = req.body;

  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget non trouvé' });

    budget.title = title ?? budget.title;
    budget.amount = amount ?? budget.amount;
    budget.paid = typeof paid === 'boolean' ? paid : budget.paid;
    budget.weddingId = weddingId ?? budget.weddingId;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE supprimer un budget
export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget non trouvé' });

    await budget.remove();
    res.json({ message: 'Budget supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
