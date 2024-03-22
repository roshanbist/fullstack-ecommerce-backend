import express from 'express';

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/ordersController';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);

router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

export default router;
