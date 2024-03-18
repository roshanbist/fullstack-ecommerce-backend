import { Category } from './Category';
import { Size } from './Size';
import { Variant } from './Variant';

export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category[];
  variants: Variant[];
  sizes: Size[];
};
