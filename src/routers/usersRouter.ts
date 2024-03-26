import express from 'express';

import { createUser, deleteuser, forgetPassword, getAllUsers, getSingleUser, updateUser } from '../controllers/usersController';

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:userId', getSingleUser);

router.post("/", createUser);
router.post('/forgetPassword', forgetPassword);

router.put('/:userId', updateUser);
router.put('/:userId/updatePassword');

router.delete('/:userId', deleteuser);

export default router;
