import { Product } from "./Product";
import { User } from "./User"

export type OrderItem = {
  product: Product;
  quantity: number;
  orderId: string;
}

export enum OrderStatus {
  PrepareItem = 'prepare',
  Delivering = 'delivering',
  Delivered = 'delivered'
}

export type Order = {
  user: User;
  items: OrderItem[];
  createdAt: string;
  totalPrice: number;
  shippingAddress: string;
  payment: boolean;
  status: OrderStatus
}