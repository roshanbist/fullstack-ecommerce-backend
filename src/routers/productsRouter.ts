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

// method, endpoint, data 
router.get("/", (request: Request, response: Response) => {
  let matchedProducts: Product[] = products;
  // Query
  const nameQuery = request.query.title as string;
  if (nameQuery) {
    matchedProducts = matchedProducts.filter((product: Product) => 
      product.title.toLowerCase().includes(nameQuery.toLowerCase()));
  }
  
  response.status(200).json(matchedProducts);
});

router.post("/", (request: Request, response: Response) => {
  const newProduct = request.body;
  products.push(newProduct);

  response.status(200).json(products);
});

router.delete("/:productId", (request: Request, response: Response) => {
  const productId = request.params.productId;
  products = products.filter((product: Product) => { product.id !== productId});
  
  response.sendStatus(204); // with no content, use sendStatus
  // response.status(200).json({ message: "delete item successfully" }); // Or send some message 
});

export default router;