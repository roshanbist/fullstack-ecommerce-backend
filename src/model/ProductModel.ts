import mongoose, { Document, Schema } from 'mongoose';

import { Product } from '../misc/types/Product';
import { Size } from '../misc/types/Size';

export type ProductDocument = Document & Product;

export const ProductSchema = new mongoose.Schema({
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
    type: [String],
    enum: [Size.Small, Size.Medium, Size.Large],
    // required: true,
    // default: [Size.Medium],
  },
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);
