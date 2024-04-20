import { Request } from 'express';

import { ForbiddenError } from '../errors/ApiError';
import { UserDocument } from '../model/UserModel';

export const getUserDetail = (request: Request): UserDocument => {
  const userPayload = request.user as UserDocument | undefined;

  if (!userPayload) {
    throw new ForbiddenError('User not found, please login');
  }
  return userPayload;
};
