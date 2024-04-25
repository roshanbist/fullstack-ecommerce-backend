import mongoose, { Document } from 'mongoose';

import { Category } from '../misc/types/Category';

export type CategoryDocument = Document & Category;

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Miscellaneous',
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<CategoryDocument>('Category', CategorySchema);
