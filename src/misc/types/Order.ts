import { User } from "./User"
import { OrderItem } from "./OrderItem";

export type Order = {
  user: User;
  items: OrderItem[];
  createdAt: string;
  totalPrice: number;
  shippingAddress: string;
}