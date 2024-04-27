import express from 'express';

import {
  createUser,
  deleteuser,
  forgetPassword,
  updatePassword,
  getAllUsers,
  updateUser,
  getSingleUserById,
  getLoggedUserProfile,
  userLogin,
  googleLogin,
  checkEmail,
} from '../controllers/usersController';
import { passportAuthenticate } from '../utils/AuthUtil';
import { PassportMethod } from '../misc/types/Passport';
import adminCheck from '../middlewares/adminCheck';

const router = express.Router();

router.get('/', passportAuthenticate(), adminCheck, getAllUsers);
router.get('/profile', passportAuthenticate(), getLoggedUserProfile);
router.get('/:userId', getSingleUserById);

router.post('/', createUser);
router.post('/check-email', checkEmail);
router.post('/login', userLogin);
router.post(
  '/google-login',
  passportAuthenticate(PassportMethod.GOOGLE_ID),
  googleLogin
);
router.post('/forget-password', forgetPassword);

router.put('/', passportAuthenticate(), updateUser);
router.put('/update-password', passportAuthenticate(), updatePassword);

router.delete('/:userId', passportAuthenticate(), adminCheck, deleteuser);

export default router;
