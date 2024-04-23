import { Product } from './Product';
import { User } from './User';

export type OrderItem = Product & {
  // product: Product;
  amount: number;
};

export enum OrderStatus {
  PrepareItem = 'prepare',
  Delivering = 'delivering',
  Delivered = 'delivered',
}

export type Order = {
  // user: User;
  user: string; //user._id
  items: OrderItem[];
  createdAt: string;
  totalPrice: number;
  // shippingAddress: string;
  // payment: boolean;
  // status: OrderStatus;
};
