import mongoose, { Document } from "mongoose";

import { Category } from "../types/type";

export type CategoryDocument = Document & Category;

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 10,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productIds: {
    type: [String],
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
