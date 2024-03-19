import express from "express";

import {
  getAllCategories,
  createCategory,
  getCategoryById,
} from "../controllers/categories";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;