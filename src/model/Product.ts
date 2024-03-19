import mongoose, { Schema } from "mongoose";
import { CategorySchema } from "./Category";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    default: 10,
  },

  // refer
  // way 1: category id
  // {title, price, categoryId }
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  // populate

  //   categoryIds: {
  //     type: [
  //       {
  //         type: Schema.Types.ObjectId,
  //         ref: "Category",
  //       },
  //     ],
  //   },

  // embed
  // way 2: category
  // {title, price, {_id: "59b99db4cfa9a34d",name: "category", "price": 10}}
  //   category: [CategorySchema],
});
