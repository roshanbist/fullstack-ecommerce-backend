import { Category } from './Category';
import { Size } from './Size';

export type Product = {
  name: string;
  price: number;
  description: string;
  images: string[];
  size: Size[];
  category: Category;
};

export type FilterProduct = {
  name?: string;
  limit?: number;
  offset?: number;
  min_price?: number;
  max_price?: number;
  category?: string;
  size?: string;
};
