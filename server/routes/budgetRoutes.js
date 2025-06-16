import express from 'express';
import {
  getBudgetsByWedding,
  createBudget,
  updateBudget,
  deleteBudget
} from '../controllers/budgetController.js';

const router = express.Router();

router.get('/wedding/:weddingId', getBudgetsByWedding);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;



