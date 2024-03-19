import mongoose, { Document } from 'mongoose';

import { Product } from '../misc/types/Product';

export type ProductDocument = Document & Product;

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  categories: {
    type: [String],
    required: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L'],
    required: true,
  },
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);
