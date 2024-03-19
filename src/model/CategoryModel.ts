import mongoose, { Document } from "mongoose";

import { Category } from "../misc/types/Category";

export type CategoryDocument = Document & Category;

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Deafult Category'
  },
  price: {
    type: Number,
    default: 10
  },
  isValid: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);