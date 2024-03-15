import { Category } from "./Category";
import { Size } from "./Size";
import { Variant } from "./Variant";

export type Product = {
  ID: string;
  name: string;
  description: string;
  categories: Category[];
  variants: Variant[];
  sizes: Size[];
};