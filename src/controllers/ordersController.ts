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
import { Order } from '../misc/types/Order';
import { UserDocument } from '../model/UserModel';
import { getUserDetail } from '../utils/commonUtil';

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserDocument = getUserDetail(req);
    const orders: OrderDocument[] = await ordersService.getAllOrders(user._id);

    if (orders && orders.length > 0) {
      return res.status(200).json(orders);
    }
    // return res.status(200).json(orders);

    throw new NotFoundError('No orders found');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Wrong format to get orders'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(
      new InternalServerError('Unkown error ouccured to find the orders')
    );
  }
};

// export const getAllMyOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user: UserDocument | undefined = req.user as UserDocument | undefined;
//     if (!user) {
//       throw new NotFoundError('User is not existed');
//     }

//     const orders: OrderDocument[] = await ordersService.getMyOrders(user._id);
//     if (orders && orders.length > 0) {
//       return res.status(200).json(orders);
//     }

//     throw new NotFoundError('No orders found');
//   } catch (e) {
//     if (e instanceof mongoose.Error.CastError) {
//       return next(new BadRequest('Wrong format to get orders'));
//     } else if (e instanceof ApiError) {
//       return next(e);
//     }

//     return next(
//       new InternalServerError('Unkown error ouccured to find the orders')
//     );
//   }
// };

export const getOrderByOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user: UserDocument | undefined = req.user as UserDocument | undefined;
    // if (!user) {
    //   throw new NotFoundError('User is not existed');
    // }

    const orderId: string = req.params.orderId;
    const order: OrderDocument | null = await ordersService.getOrderyById(
      orderId
    );

    if (order) {
      return res.status(200).json(order);
    }

    throw new NotFoundError('No matched order with this order id');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Wrong id format'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(
      new InternalServerError('Unkown error ouccured to find the order')
    );
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user: UserDocument = req.user as UserDocument;
    const user: UserDocument = getUserDetail(req);

    // console.log('user aayena ra', user);

    // if (!user) {
    //   throw new NotFoundError('User not Found');
    // }

    // const items: Order = req.body;
    const orderInfo: Order = req.body;
    orderInfo.user = user._id;

    console.log('orderinfo', orderInfo);

    // const order: OrderDocument = new OrderModel({ ...items, user: user._id });

    const order: OrderDocument = new OrderModel(orderInfo);

    const newOrder: OrderDocument = await ordersService.createOrder(order);

    if (newOrder) {
      return res.status(201).json(newOrder);
    }

    throw new ForbiddenError('Creating order is not allowed');
  } catch (e) {
    // console.log(e);
    if (e instanceof mongoose.Error) {
      return next(
        new BadRequest(e.message ?? 'Wrong data format to create an order')
      );
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot create a new order'));
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user: UserDocument | undefined = req.user as UserDocument | undefined;
    // if (!user) {
    //   throw new ForbiddenError('User is undefined');
    // }

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
      return next(
        new BadRequest(e.message ?? 'Wrong data format to udpate order')
      );
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(
      new InternalServerError('Unkown error ouccured to update the order')
    );
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user: UserDocument | undefined = req.user as UserDocument | undefined;
    // if (!user) {
    //   throw new NotFoundError('User is not existed');
    // }

    const orderId = req.params.orderId as string;
    const deletedOrder: OrderDocument | null =
      await ordersService.deleteOrderById(orderId);

    if (deletedOrder) {
      // return res.status(204).json();
      return res.sendStatus(204);
    }

    throw new ForbiddenError('Deleting order is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Wrong data format to delete order'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(
      new InternalServerError('Unkown error ouccured to delete the order')
    );
  }
};
