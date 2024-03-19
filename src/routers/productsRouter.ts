import express from "express";

import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);

export default router;
