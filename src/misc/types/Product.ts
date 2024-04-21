import { ProductDocument } from '../../model/ProductModel';
import { Category } from './Category';
import { Size } from './Size';

export type Product = {
  title: string;
  price: number;
  description: string;
  images: string[];
  size: Size;
  category: Category;
};

export type FilterProduct = {
  title?: string;
  limit?: number;
  offset?: number;
  min_price?: number;
  max_price?: number;
  category?: string;
  size?: string;
  sort_title?: string;
};

export type ProductsList = {
  total: number;
  products: ProductDocument[];
};
