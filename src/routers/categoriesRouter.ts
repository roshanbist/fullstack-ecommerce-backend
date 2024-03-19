import express from 'express';

import {
  deleteCategory,
  updateCategory,
  getAllCategories,
  createCategory,
  getCategoryById,
} from '../controllers/categoriesController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
