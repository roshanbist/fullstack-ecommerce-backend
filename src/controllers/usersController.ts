import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import usersService from '../services/usersService';
import { ApiError, BadRequest, ForbiddenError, InternalServerError, NotFoundError } from '../errors/ApiError';
import { PasswordReset, PasswordUpdte } from '../misc/types/Password';
import User, { UserDocument } from '../model/UserModel';
import AuthUtil from '../misc/utils/AuthUtil';
import { JwtTokens } from '../misc/types/JwtPayload';

export const getAllUsers = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const userList = await usersService.getAllUsers();
    if (userList) {
      return response.status(200).json(userList);
    }
    throw new NotFoundError('No Users Found');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Wrong format to get Users'));
    } else if (error instanceof ApiError) {
      return next(error);
    }
    return next(new InternalServerError('Internal Server Error'));
  }
};

export const getSingleUserById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const getUser = await usersService.getUserById(request.params.userId);
    if (getUser) {
      return response.status(200).json(getUser);
    }
    throw new NotFoundError('No matched user with the id');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Wrong id format'));
    } else if (error instanceof ApiError) {
      return next(error);
    }

    return next(new InternalServerError('Internal Server Error '));
  }
};

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { password } = request.body;
    const hashedPassword = await AuthUtil.getHashedAuth(password);
    const data = new User({ ...request.body, password: hashedPassword });
    const userData = await usersService.createUser(data);
    if (userData) {
      return response.status(201).json(userData);
    }
    throw new ForbiddenError('Creating User is not allowed');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong data format to create'));
    } else if (error instanceof ApiError) {
      return next(error);
    }
    return next(new InternalServerError('Internal server error '));
  }
};

export const deleteuser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const foundUser = await usersService.deleteUser(request.params.userId);
    if (foundUser) {
      return response.sendStatus(204);
    }
    throw new ForbiddenError('Delete User is not allowed');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to delete'));
    } else if (error instanceof ApiError) {
      return next(error);
    }
    return next(new InternalServerError('Internal Server Error'));
  }
};

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: UserDocument = request.user as UserDocument;

    const updatedUser = await usersService.updateUser(user._id, request.body);
    if (updatedUser) {
      return response.status(200).json(updatedUser);
    }
    throw new ForbiddenError('Updating user is not allowed');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong data format to udpate'));
    } else if (error instanceof ApiError) {
      return next(error);
    }
    return next(new InternalServerError('Internal Server Error'));
  }
};

export const userLogin = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body;
    const user: UserDocument | null = await usersService.getUserByEmail(email);
    if (user) {
      const isMatched: boolean = await AuthUtil.comparePlainAndHashed(password, user.password);
      if (!isMatched) {
        throw new BadRequest("Password didn't match");
      }
      const tokens: JwtTokens = await AuthUtil.generateTokens(user);
      return response.status(200).json({ tokens, user });
    }
    throw new NotFoundError('User Not Found');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to login'));
    } else if (error instanceof ApiError) {
      return next(error);
    }
    return next(new InternalServerError('Internal Server Error'));
  }
};

export const googleLogin = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: UserDocument | undefined = request.user as UserDocument | undefined;
    if (user) {
      const tokens: JwtTokens = await AuthUtil.generateTokens(user);
      return response.status(200).json({ tokens, user });
    }
    
    throw new NotFoundError('User is not foud');
  } catch(e) {
    if (e instanceof mongoose.Error.CastError) {// from mongoose
      return next(new BadRequest('Wrong format to login with google'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot login with google'));
  }
}

// #Woong
export const forgetPassword = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const resetPasswordInfo: PasswordReset = request.body;
    const matchedUser: UserDocument | null = await usersService.getUserByEmail(resetPasswordInfo.userEmail);

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
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong format to reset password'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot reset the password'));
  }
};

// #Woong
export const updatePassword = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId: string = request.params.userId;
    const updateInfo: PasswordUpdte = request.body;

    const user: UserDocument | null = await usersService.getUserById(userId);
    if (user) {
      const matched: boolean = await AuthUtil.comparePlainAndHashed(updateInfo.oldPassword, user.password);
      if (!matched) {
        throw new BadRequest('Your passowrd is not correct');
      }

      user.password = await AuthUtil.getHashedAuth(updateInfo.newPassword);
      const updatedUser: UserDocument | null = await usersService.updateUser(userId, user);
      if (updatedUser) {
        return response.status(200).json(updatedUser);
      }
    }

    throw new ForbiddenError('You are allowed to reset the password');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong format to reset password'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot reset the password'));
  }
};
