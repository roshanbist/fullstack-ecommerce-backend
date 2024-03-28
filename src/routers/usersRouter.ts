import express from 'express';

import {
  createUser,
  deleteuser,
  forgetPassword,
  updatePassword,
  getAllUsers,
  updateUser,
  getSingleUserById,
  userLogin,
} from '../controllers/usersController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getSingleUserById);

router.post('/', createUser);
router.post('/forgetPassword', forgetPassword);
router.post('/login', userLogin);

router.put('/:userId', updateUser);
router.put('/:userId/updatePassword', updatePassword);

router.delete('/:userId', deleteuser);

export default router;
