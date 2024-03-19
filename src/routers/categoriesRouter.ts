import express from "express";

import {
  getAllCategories,
  createCategory,
  getCategoryById,
} from "../controllers/categories";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:categoryId", getCategoryById);

export default router;
