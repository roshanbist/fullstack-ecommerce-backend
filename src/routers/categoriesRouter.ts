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
router.get('/:id', getCategoryById);
router.post('/', adminCheck, createCategory);
router.put('/:id', adminCheck, updateCategory);
router.delete('/:id', adminCheck, deleteCategory);

export default router;
