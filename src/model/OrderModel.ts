import mongoose, { Document, Schema } from 'mongoose';

import { Order } from '../misc/types/Order';
import { OrderItemSchema } from './OrderItemModel';

export type OrderDocument = Document & Order;

export const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    type: OrderItemSchema 
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  shippingAddress: {
    type: String
  }
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);
