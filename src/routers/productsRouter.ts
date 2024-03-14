// // product router
// import express, { Request, Response } from "express";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
// };

// // fake database
// let products: Product[] = [
//   { id: "1", name: "product1", price: 1 },
//   { id: "2", name: "product2", price: 2 },
//   { id: "3", name: "product3", price: 3 },
// ];

// const router = express.Router();

// // query
// // http://localhost:8080/api/v1/products?name=Generic
// // ?offset=0&limit=10
// // search
// // filter
// router.get("/", (request: Request, response: Response) => {
//   // query
//   const nameQuery = request.query.name as string;
//   console.log(request.query, "query");
//   const priceQuery = request.query.price as string;

//   products = products.filter((product) =>
//     product.name.toLowerCase().includes(nameQuery.toLowerCase())
//   );
//   // get product with less than priceQuery
//   response.status(200).json(products);
// });

// // base url:"http://localhost:8080/api/v1/products/"
// // router.get("/", (request: Request, response: Response) => {
// //   response.status(200).json(products);
// // });

// router.post("/", (request: Request, response: Response) => {
//   const newProduct = request.body;
//   products.push(newProduct);
//   response.status(201).json(products);
// });

// // base url:"http://localhost:8080/api/v1/products/:productId"
// router.delete("/:productId", (request: Request, response: Response) => {
//   const productId = request.params.productId;
//   products = products.filter((item) => item.id !== productId);
//   response.sendStatus(204);
// });

// export default router;
