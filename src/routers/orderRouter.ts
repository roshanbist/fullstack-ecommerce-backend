import express from 'express';

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/ordersController';

const router = express.Router();

router.get('/:userId', getAllOrders);
router.post('/:userId', createOrder);

router.get('/:userId/:orderId', getOrderById);
router.put('/:userId/:orderId', updateOrder);
router.delete('/:userId/:orderId', deleteOrder);

export default router;
