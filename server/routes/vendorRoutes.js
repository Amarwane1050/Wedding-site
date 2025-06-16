import express from 'express';
import {
  getVendorsByWedding,
  createVendor,
  updateVendor,
  deleteVendor
} from '../controllers/vendorController.js';

const router = express.Router();

router.get('/wedding/:weddingId', getVendorsByWedding);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

export default router;


