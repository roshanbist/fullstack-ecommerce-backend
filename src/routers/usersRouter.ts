import express from 'express';

import { 
  changePassword, 
  checkEmailAvailable, 
  createNewUser, 
  deleteUser, 
  forgetPassword, 
  getSingleUser, 
  getUsers, 
  updateUser 
} from '../controllers/usersController';

const router = express.Router();

router.get("/", getUsers);
router.post("/", createNewUser);

router.get("/:userId", getSingleUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/is-available", checkEmailAvailable);
router.post("/forgetPassword", forgetPassword);
router.post("/changePassword", changePassword);

export default router;