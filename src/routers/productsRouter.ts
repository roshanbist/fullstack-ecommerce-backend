import express from 'express';

import { 
  deleteProductById, 
  getProductById, 
  getProducts } from '../controllers/productsController';

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProductById);

export default router;
