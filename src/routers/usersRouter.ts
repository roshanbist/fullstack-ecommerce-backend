import express from 'express';

import {
  createUser, 
  deleteuser, 
  forgetPassword, 
  updatePassword, 
  getAllUsers, 
  updateUser, 
  getUserById
} from '../controllers/usersController';

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:userId', getUserById);

router.post("/", createUser);
router.post('/forgetPassword', forgetPassword);

router.put('/:userId', updateUser);
router.put('/:userId/updatePassword', updatePassword);

router.delete('/:userId', deleteuser);

export default router;
