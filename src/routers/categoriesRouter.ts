import express from 'express';

import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoriesController";
import adminCheck from '../middlewares/adminCheck';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', adminCheck, createCategory);

router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', adminCheck, updateCategory);
router.delete('/:categoryId', adminCheck, deleteCategory);

export default router;
