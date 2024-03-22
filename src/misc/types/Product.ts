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
