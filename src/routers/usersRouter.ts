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
  googleLogin,
} from '../controllers/usersController';
import { passportAuthenticate } from '../misc/utils/AuthUtil';
import { PassportMethod } from '../misc/types/Passport';

const router = express.Router();

router.get('/', getAllUsers); // Do we need this?
router.get('/:userId', getSingleUserById); // Do we need this?

router.post('/', createUser);
router.post('/login', userLogin);
router.post('/google-login',  passportAuthenticate(PassportMethod.GOOGLE_ID), googleLogin)
router.post('/forget-password', forgetPassword);

router.put('/', passportAuthenticate(), updateUser);
router.put('/update-password', passportAuthenticate(), updatePassword);

router.delete('/:userId', deleteuser); // Do we need this?
 
export default router;
