import mongoose, { Document, Schema } from 'mongoose';

import { Product } from '../misc/types/Product';
import { Size } from '../misc/types/Size';

export type ProductDocument = Document & Product;

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 10
  },
  images: {
    type: [String],
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  size: {
    type: String,
    enum: [Size.Small, Size.Medium, Size.Large],
    default: Size.Medium
  },
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);
