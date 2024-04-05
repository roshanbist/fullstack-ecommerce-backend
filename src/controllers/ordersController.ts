import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { ApiError, BadRequest, ForbiddenError, InternalServerError, NotFoundError } from '../errors/ApiError';
import OrderModel, { OrderDocument } from '../model/OrderModel';
import ordersService from '../services/ordersService';
import { Order } from '../misc/types/Order';
import { UserDocument } from '../model/UserModel';

// #Woong
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders: OrderDocument[] = await ordersService.getAllOrders();
    if (orders && orders.length > 0) {
      return res.status(200).json(orders);
    }

    throw new NotFoundError('No orders found');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong format to get orders'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Unkown error ouccured to find the orders'));
  }
};

// #Woong
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId: string = req.params.orderId;
    const order: OrderDocument | null = await ordersService.getOrderyById(orderId);
    if (order) {
      return res.status(200).json(order);
    }

    throw new NotFoundError('No matched order with the id');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong id format'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Unkown error ouccured to find the order'));
  }
};

// #Woong
export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserDocument | undefined = req.user as UserDocument | undefined;
    if (!user) {
      throw new NotFoundError('User is not existed');
    }

    const orders: OrderDocument[] = await ordersService.getMyOrders(user._id);
    if (orders && orders.length > 0) {
      return res.status(200).json(orders);
    }

    throw new NotFoundError('No orders found');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong format to get orders'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Unkown error ouccured to find the orders'));
  }
};

// #Woong
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserDocument | undefined = req.user as UserDocument | undefined;
    if (!user) {
      throw new NotFoundError('User is not existed');
    }

    const items: Order = req.body;
    const order: OrderDocument = new OrderModel({ ...items, user: user._id });

    const savedOrder: OrderDocument = await ordersService.createOrder(order);
    if (savedOrder) {
      return res.status(201).json(savedOrder);
    }

    throw new ForbiddenError('Creating order is not allowed');
  } catch (e) {
    console.log(e);
    if (e instanceof mongoose.Error) {
      // from mongoose
      return next(new BadRequest(e.message ?? 'Wrong data format to create an order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot create a new order'));
  }
};

// #Woong
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserDocument | undefined = req.user as UserDocument | undefined;
    if (!user) {
      throw new ForbiddenError('User is undefined');
    }

    const orderId: string = req.params.orderId;
    const updateInfo: Partial<OrderDocument> = req.body;
    const updatedOrder = await ordersService.updateOrder(orderId, updateInfo);
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    }

    throw new ForbiddenError('Updating order is not allowed');
  } catch (e) {
    console.log(e);
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest(e.message ?? 'Wrong data format to udpate order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Unkown error ouccured to update the order'));
  }
};

// #Woong
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserDocument | undefined = req.user as UserDocument | undefined;
    if (!user) {
      throw new NotFoundError('User is not existed');
    }

    const orderId: string = req.params.orderId;
    const deletedOrder: OrderDocument | null = await ordersService.deleteOrderById(orderId);
    if (deletedOrder) {
      return res.status(204).json();
    }

    throw new ForbiddenError('Deleting order is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong data format to delete order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Unkown error ouccured to delete the order'));
  }
};
