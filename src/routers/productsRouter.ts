import express from 'express';

import {
  createNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController';
import adminCheck from '../middlewares/adminCheck';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', adminCheck, createNewProduct);

router.get('/:productId', getProductById);
router.put('/:productId', adminCheck, updateProduct);
router.delete('/:productId', adminCheck, deleteProductById);

export default router;
