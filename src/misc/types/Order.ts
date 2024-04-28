import { Product } from './Product';

export type OrderItem = Product & {
  amount: number;
};

export enum OrderStatus {
  PrepareItem = 'prepare',
  Delivering = 'delivering',
  Delivered = 'delivered',
}

export type Order = {
  user: string; //user._id
  items: OrderItem[];
  createdAt: string;
  totalPrice: number;
};
