import OrderModel, { OrderDocument } from "../model/OrderModel";

const getAllOrders = async (userId: string): Promise<OrderDocument[]> => {
  return await OrderModel.find({
    user: userId
  }).populate([
    { path: 'user', select: { userName: 1, address: 1 }}
  ]);
}

const getOrderyById = async (orderId: string): Promise<OrderDocument | null> => {
  return await OrderModel.findById(orderId)
  .populate([
    { path: 'user', select: { userName: 1, address: 1 }}
  ]);
}

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return await order.save();
}
 
const updateOrder = async (orderId: string, updateInfo: Partial<OrderDocument>): Promise<OrderDocument | null> => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateInfo, {
    new: true
  });

  return updatedOrder;
}

const deleteOrderById = async (orerId: string): Promise<OrderDocument | null> => {
  return await OrderModel.findByIdAndDelete(orerId);
}

export default { 
  getAllOrders, 
  getOrderyById,
  createOrder,
  updateOrder,
  deleteOrderById
};  