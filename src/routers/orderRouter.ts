import express from 'express';

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/ordersController';
import { passportAuthenticate } from '../misc/utils/AuthUtil';

const router = express.Router();

router.get('/', getAllOrders)
router.get('/:orderId', getOrderById);
router.get('/myOrders', passportAuthenticate(), getMyOrders);

router.post('/', passportAuthenticate(), createOrder);
router.put('/:orderId', passportAuthenticate(), updateOrder);
router.delete('/:orderId', passportAuthenticate(), deleteOrder);

export default router;
