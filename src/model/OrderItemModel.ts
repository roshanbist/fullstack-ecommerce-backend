import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../misc/types/Order';

export type OrderItemDocument = Document & OrderItem;

export const OrderItemSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
}); 

export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);
