import express, { Request, Response } from 'express';

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  stockQuantity: number;
  categoryId: number;
};

let products: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    price: 1,
    description: 'Description 1',
    images: ['product1 image'],
    stockQuantity: 100,
    categoryId: 1,
  },
  {
    id: '2',
    title: 'Product 2',
    price: 2,
    description: 'Description 2',
    images: ['product2 image'],
    stockQuantity: 30,
    categoryId: 2,
  },
  {
    id: '3',
    title: 'Product 3',
    price: 3,
    description: 'Description 3',
    images: ['product3 image'],
    stockQuantity: 10,
    categoryId: 3,
  },
];

const router = express.Router();

// handle GET request and filtering of products
router.get('/', (request: Request, response: Response) => {
  const titleQuery = request.query.title as string;

  try {
    if (titleQuery) {
      const matchedProducts = products.filter((product) =>
        product.title.toLowerCase().includes(titleQuery.toLowerCase())
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

// handle GET product by id
router.get('/:productId', (request: Request, response: Response) => {
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
});

// handle DELETE product by id
router.delete('/:productId', (request: Request, response: Response) => {
  const productId = request.params.productId;

  try {
    products = products.filter((product) => product.id !== productId);
    response.sendStatus(204);
  } catch (error) {
    console.error('Error finding product', error);
    response.status(500).json({ message: 'Server error' });
  }
});

export default router;
