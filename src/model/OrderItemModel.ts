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
    defualt: 1
  },
  orderId: {
    type: {
      type: String,
      required: true
    }
  }
});

export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);
