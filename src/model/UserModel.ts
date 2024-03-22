import mongoose, { Document } from 'mongoose';

import { User } from '../misc/types/User';

export type UserDocument = Document & User;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);
