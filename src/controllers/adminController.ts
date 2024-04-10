import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
} from '../errors/ApiError';
import { UserDocument } from '../model/UserModel';
import usersService from '../services/usersService';
import { UserActiveAndRole } from '../misc/types/User';

export const enableActiveAndRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    const activeAndRole: Partial<UserActiveAndRole> = req.body;

    const user: UserDocument | null = await usersService.updateUser(
      userId,
      activeAndRole
    );
    if (user) {
      return res.status(200).json(user);
    }

    throw new ForbiddenError('User is forbbiden to enable active and role');
  } catch (e) {
    // error from mongoose
    if (e instanceof mongoose.Error) {
      return next(
        new BadRequest(e.message ?? 'Wrong format to enable active and role')
      );
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(
      new InternalServerError('Unkown error ouccured to enable active and role')
    );
  }
};
