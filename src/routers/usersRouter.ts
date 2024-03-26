import express from 'express';

import { createUser, deleteuser, forgetPassword, getAllUsers, getSingleUser, updateUser } from '../controllers/usersController';

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:id', getSingleUser);

router.post("/", createUser);
router.post('/forgetPassword', forgetPassword);

router.put('/:id', updateUser);
router.delete('/:id', deleteuser);

export default router;
