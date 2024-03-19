import mongoose, { Document, Model } from "mongoose";
import { User } from "../types/type";

const Schema = mongoose.Schema;

export type UserDocument = Document & User;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>("Users", UserSchema);
