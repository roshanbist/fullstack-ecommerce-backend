import OrderModel, { OrderDocument } from '../model/OrderModel';

const getAllOrders = async (userId: string): Promise<OrderDocument[]> => {
  const orders: OrderDocument[] = await OrderModel.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'user', select: { _id: 0, password: 0 } },
      { path: 'items.category' },
    ]);

  return orders;
};

const getOrderyById = async (
  orderId: string
): Promise<OrderDocument | null> => {
  const order: OrderDocument | null = await OrderModel.findById(
    orderId
  ).populate([
    { path: 'user', select: { _id: 0, password: 0 } },
    { path: 'items.category' },
  ]);

  return order;
};

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return await order.save();
};

const updateOrder = async (
  orderId: string,
  updateInfo: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateInfo, {
    new: true,
  }).populate([
    { path: 'user', select: { _id: 0, password: 0 } },
    { path: 'items.category' },
  ]);

  return updatedOrder;
};

const deleteOrderById = async (
  orderId: string
): Promise<OrderDocument | null> => {
  return await OrderModel.findByIdAndDelete(orderId).populate([
    { path: 'user', select: { _id: 0, password: 0 } },
    { path: 'items.category' },
  ]);
};

export default {
  getAllOrders,
  getOrderyById,
  // getMyOrders,
  createOrder,
  updateOrder,
  deleteOrderById,
};
