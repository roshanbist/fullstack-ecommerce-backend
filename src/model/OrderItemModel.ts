import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../misc/types/Order';

export type OrderItemDocument = Document & OrderItem;

export const OrderItemSchema = new Schema({
  amount: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);
