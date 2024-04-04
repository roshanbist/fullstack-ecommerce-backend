import express from 'express';

import { passportAuthenticate } from '../misc/utils/AuthUtil';
import adminCheck from '../middlewares/adminCheck';
import { enableActiveAndRole } from '../controllers/adminController';

const router = express.Router();

router.post("/:userId", passportAuthenticate(), adminCheck, enableActiveAndRole);

export default router;