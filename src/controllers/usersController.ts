import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import usersService from '../services/usersService';
import { ApiError, BadRequest, ForbiddenError, InternalServerError, NotFoundError } from '../errors/ApiError';
import { PasswordReset, PasswordUpdte } from '../misc/types/Password';
import UserModel, { UserDocument } from "../model/UserModel";
import { User } from '../misc/types/User';

export const getAllUsers = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userList = await usersService.getAllUser();
    response.status(200).json(userList);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};

export const getSingleUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const getUser = await usersService.getUserById(request.params.userId);
    response.status(200).json(getUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.userId}` });
      return;
    }
    next(new InternalServerError('Internal Server Error'));
  }
};

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = new UserModel(request.body);
    const newUser = await usersService.createUser(data);
    response.status(201).json(newUser);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};

export const deleteuser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    usersService.deleteUser(request.params.userId);
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.userId}` });
      return;
    }
    next(new InternalServerError('Internal Server Error'));
  }
};

export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await usersService.updateUser(
      request.params.userId,
      request.body
    );
    response.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.userId}` });
      return;
    }
    next(new InternalServerError('Internal Server Error'));
  }
};

// #Woong
export const forgetPassword = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const resetPasswordInfo: PasswordReset = request.body;
    const matchedUser: UserDocument | null = await usersService.getUsrByEmail(resetPasswordInfo.userEmail);
  
    if (!matchedUser) {
      throw new NotFoundError(`User not found with email ${resetPasswordInfo.userEmail}`);
    }
  
    matchedUser.password = 'hopefullyRemeberPassword';
    const updatedUser: UserDocument | null = await usersService.resetPassword(matchedUser);
    if (updatedUser) {
      return response.status(200).json(updatedUser); 
    }
  
    throw new ForbiddenError('You are allowed to reset the password');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong format to reset password'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot reset the password'));
  } 
}
