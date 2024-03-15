import express, { Request, Response } from 'express';
import { Product } from '../misc/types/Product';

import { Variant } from '../misc/types/Variant';
import { Size } from '../misc/types/Size';

let products: Product[] = [
  {
    ID: '0',
    name: 'Product 0',
    description: 'Description 0',
    categories: [{ name: "T-shirts" }],
    variants: [Variant.Blue, Variant.Dark],
    sizes: [Size.L, Size.M]
  },
  {
    ID: '1',
    name: 'Product 1',
    description: 'Description 1',
    categories: [{ name: "Pants" }],
    variants: [Variant.Red, Variant.Yellow],
    sizes: [Size.M]
  },
  {
    ID: '2',
    name: 'Product 2',
    description: 'Description 2',
    categories: [{ name: "SportsWear" }],
    variants: [Variant.Dark, Variant.White],
    sizes: [Size.XL, Size.XS]
  },
];

const router = express.Router();

// #Roshan
// handle GET request and filtering of products
router.get('/', (request: Request, response: Response) => {
  const titleQuery = request.query.title as string;

  try {
    if (titleQuery) {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(titleQuery.toLowerCase())
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
});

// #Roshan
// handle GET product by id
router.get('/:productId', (request: Request, response: Response) => {
  const productId = request.params.productId;

  try {
    const singleProductData = products.find(
      (product) => product.ID === productId
    );

    if (!singleProductData) {
      response.status(404).json({ message: 'Product not found' });
    }

    response.status(200).json(singleProductData);
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
});

// #Roshan
// handle DELETE product by id
router.delete('/:productId', (request: Request, response: Response) => {
  const productId = request.params.productId;

  try {
    products = products.filter((product) => product.ID !== productId);
    response.sendStatus(204);
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
});

export default router;
