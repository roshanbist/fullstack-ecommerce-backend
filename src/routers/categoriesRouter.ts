import express from 'express';

import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController';
import adminCheck from '../middlewares/adminCheck';
import { passportAuthenticate } from '../utils/AuthUtil';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', passportAuthenticate(), adminCheck, createCategory);

router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', passportAuthenticate(), adminCheck, updateCategory);
router.delete(
  '/:categoryId',
  passportAuthenticate(),
  adminCheck,
  deleteCategory
);

export default router;
