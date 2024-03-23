import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import usersService from '../services/usersService';
import { InternalServerError } from '../errors/ApiError';
import { PasswordReset, PasswordUpdte } from '../misc/types/Password';
import UserModel from "../model/UserModel";
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
    const getUser = await usersService.getUserById(request.params.id);
    response.status(200).json(getUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.id}` });
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
    console.log('new user ', newUser);
    response.status(201).json(newUser);
  } catch (error) {
    // response.status(500).json({ message: "Internal Server Error" });
    next(new InternalServerError('Internal Server Error'));
  }
};

export const deleteuser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    usersService.deleteUser(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.id}` });
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
      request.params.id,
      request.body
    );
    response.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response
        .status(404)
        .json({ message: `cannot find user with id ${request.params.id}` });
      return;
    }
    next(new InternalServerError('Internal Server Error'));
  }
};

// #Woong
export function forgetPassword(request: Request, response: Response) {
  const resetPasswordInfo: PasswordReset = request.body;
  if (resetPasswordInfo) {
    const users:  User[] = [];
    const matchedUser: User | undefined = users.find(
      (user: User) => user.email === resetPasswordInfo.userEmail
    );
    if (matchedUser) {
      matchedUser.password = '0000';
      return response
        .status(200)
        .json({ message: 'Reset password successfully' });
    }

    return response
      .status(404)
      .json({ message: 'User is not exsited! Check the user email again!' });
  }

  return response.status(404).json({ message: 'Not valid user' });
}

// #Woong
// export function changePassword(request: Request, response: Response) {
//   const passwordInfo: PasswordUpdte = request.body;

//   if (passwordInfo) {
//     const matchedIndex: number = findUserIndexByName(passwordInfo.userName);
//     if (matchedIndex > -1) {
//       const existedUser: User = users[matchedIndex];
//       if (existedUser && existedUser.password === passwordInfo.oldPassword) {
//         existedUser.password = passwordInfo.newPassword;
//         users[matchedIndex] = existedUser;

//         return response
//           .status(200)
//           .json({ message: 'The password successfully changed!' });
//       }

//       return response.status(404).json({ message: 'The password is wrong!' });
//     }
//   }

//   return response.status(400).json({ message: 'Not valid ino provided!' });
// }
