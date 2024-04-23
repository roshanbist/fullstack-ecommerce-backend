import express from 'express';

import {
  getAllOrders,
  getOrderByOrderId,
  // getMyOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  // getAllMyOrders,
} from '../controllers/ordersController';
import { passportAuthenticate } from '../utils/AuthUtil';

const router = express.Router();

// router.get('/', getAllOrders);
// router.get('/myOrders', passportAuthenticate(), getAllMyOrders);
// router.get('/myOrders/:orderId', passportAuthenticate(), getMyOrderById);

router.get('/', passportAuthenticate(), getAllOrders);
router.get('/:orderId', passportAuthenticate(), getOrderByOrderId);

router.post('/', passportAuthenticate(), createOrder);
router.put('/:orderId', passportAuthenticate(), updateOrder);
router.delete('/:orderId', passportAuthenticate(), deleteOrder);

export default router;
