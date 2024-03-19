import express from 'express';

import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoriesController';

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;