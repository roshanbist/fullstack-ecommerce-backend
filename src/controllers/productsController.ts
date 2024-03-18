import { Request, Response } from 'express';
import { Product } from '../misc/types/Product';
import { Size } from '../misc/types/Size';
import { Variant } from '../misc/types/Variant';

// DB
let products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    categories: [{ name: 'T-shirts' }],
    variants: [Variant.Blue, Variant.Dark],
    sizes: [Size.L, Size.M],
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    categories: [{ name: 'Pants' }],
    variants: [Variant.Red, Variant.Yellow],
    sizes: [Size.M],
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Description 3',
    categories: [{ name: 'SportsWear' }],
    variants: [Variant.Dark, Variant.White],
    sizes: [Size.XL, Size.XS],
  },
];

// #Roshan
export function getProducts(request: Request, response: Response) {
  const nameQuery = request.query.name as string;
  const categoryQuery = request.query.categoryName as string;
  
  try {
    if (nameQuery) {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(nameQuery.toLowerCase())
      );

      if (matchedProducts.length > 0) {
        response.status(200).json(matchedProducts);
      } else {
        response.status(404).json({ message: 'No match found' });
      }
    } else {
      response.status(200).json(products);
    }
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
}

// #Roshan
export function getProductById(request: Request, response: Response) {
  const productId = request.params.productId;

  try {
    const singleProductData = products.find(
      (product) => product.id === productId
    );

    if (!singleProductData) {
      response.status(404).json({ message: 'Product not found' });
    }

    response.status(200).json(singleProductData);
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
}

// #Roshan
export function deleteProductById(request: Request, response: Response) {
  const productId = request.params.productId;

  try {
    products = products.filter((product) => product.id !== productId);
    response.sendStatus(204);
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
}