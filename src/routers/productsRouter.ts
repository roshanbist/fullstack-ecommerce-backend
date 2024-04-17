import express from 'express';

import {
  createNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController';
import adminCheck from '../middlewares/adminCheck';
import { passportAuthenticate } from '../utils/AuthUtil';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', passportAuthenticate(), adminCheck, createNewProduct);

router.get('/:productId', getProductById);
router.put('/:productId', passportAuthenticate(), adminCheck, updateProduct);
router.delete(
  '/:productId',
  passportAuthenticate(),
  adminCheck,
  deleteProductById
);

export default router;
