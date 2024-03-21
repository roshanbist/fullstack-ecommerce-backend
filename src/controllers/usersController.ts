import express, { NextFunction, Request, Response } from 'express';

import usersService from '../services/usersService';
import User from "../model/UserModel";
import { NotFoundError, InternalServerError } from '../errors/ApiError';
import mongoose from 'mongoose';

export const getAllUsers = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const userList = await usersService.getAllUser();
    response.status(200).json(userList);
  } catch (error) {
    next(new InternalServerError("Internal Server Error"));
  }
};

export const getSingleUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const getUser = await usersService.getUserById(request.params.id);
    response.status(200).json(getUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({ message: `cannot find user with id ${request.params.id}` });
      return;
    }
    next(new InternalServerError("Internal Server Error"));
  }
};

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = new User(request.body);
    const newUser = await usersService.createUser(data);
    console.log("new user ", newUser);
    response.status(201).json(newUser);
  } catch (error) {
    // response.status(500).json({ message: "Internal Server Error" });
    next(new InternalServerError("Internal Server Error"));
  }
};

export const deleteuser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    usersService.deleteUser(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({ message: `cannot find user with id ${request.params.id}` });
      return;
    }
    next(new InternalServerError("Internal Server Error"));
  }
};

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const updatedUser = await usersService.updateUser(request.params.id, request.body);
    response.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({ message: `cannot find user with id ${request.params.id}` });
      return;
    }
    next(new InternalServerError("Internal Server Error"));
  }
};
