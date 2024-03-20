import express from 'express';

import {
  createNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createNewProduct);
router.put('/:productId', updateProduct);
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProductById);

export default router;
