import express from 'express';

import { createUser, deleteuser, getAllUsers, getSingleUser, updateUser } from '../controllers/usersController';
const router = express.Router();

// get all products or paginatedProducts or filter
router.get("/", getAllUsers);

// // get single product
router.get('/:id', getSingleUser);

// // create a product
router.post("/", createUser);

// // delete product
router.delete('/:id', deleteuser);

// // Update product
router.put('/:id', updateUser);

export default router;
