import mongoose, { Document, Schema } from 'mongoose';

import { Order } from '../misc/types/Order';

export type OrderDocument = Document & Order;

export const OrderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'OrderItem' 
    }],
    defult: []
  },
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
