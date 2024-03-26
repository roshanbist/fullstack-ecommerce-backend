import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../errors/ApiError';
import OrderModel, { OrderDocument } from '../model/OrderModel';
import ordersService from '../services/ordersService';
import { OrderItem } from '../misc/types/Order';
import OrderItemModel, { OrderItemDocument } from '../model/OrderItemModel';

// #Woong
export const getAllOrders = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const orders: OrderDocument[] = await ordersService.getAllOrders();
    if (orders) {
      return res.status(200).json(orders);
    }

    throw new NotFoundError('No orders found');
  } catch (e) {
    console.log(e);
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong format to get orders'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot find the orders'));
  }
};

// #Woong
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId: string = req.params.orderId;
    const order: OrderDocument | null =
      await ordersService.getOrderyById(orderId);
    if (order) {
      return res.status(200).json(order);
    }

    throw new NotFoundError('No matched order with the id');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong id format'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot find the order'));
  }
};

// #Woong
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newData: OrderDocument = new OrderModel(req.body);
    if (req.body && req.body.items) {
      const orderItems: OrderItem[] = req.body.items;
      const newItems: OrderItemDocument[] = orderItems.map((item: OrderItem) => {
        return new OrderItemModel(item);
      });

      newData.items = await ordersService.createOrderItems(newItems);
    }

    const newOrder: OrderDocument = await ordersService.createOrder(newData);
    if (newOrder) {
      return res.status(201).json(newOrder);
    }

    throw new ForbiddenError('Creating order is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to create an order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot create a new order'));
  }
};

// #Woong
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Make the user not able to change the items(product or quantity but only shipping address)
    // Alternatively, remove all orderItems and Save new orderItems
    // But we can decide if user can edit or not

    const orderId = req.params.orderId as string;
    const updateInfo = req.body as Partial<OrderDocument>;
    const updatedOrder = await ordersService.updateOrder(orderId, updateInfo);
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    }

    throw new ForbiddenError('Updating order is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      // from mongoose
      return next(new BadRequest('Wrong data format to udpate order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot update the order'));
  }
};

// #Woong
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.orderId as string;
    const deletedOrder: OrderDocument | null = await ordersService.deleteOrderById(orderId);
    if (deletedOrder) {
      return res.status(204).json();
    }

    throw new ForbiddenError('Deleting order is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to delete order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot delete the order'));
  }
};
