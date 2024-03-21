import { Category } from './Category';
import { Size } from './Size';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  size: Size[];
  category: Category;
};
