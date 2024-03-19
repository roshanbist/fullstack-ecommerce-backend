import express from 'express';

import {
  createNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
} from '../controllers/productsController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createNewProduct);
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProductById);

export default router;
