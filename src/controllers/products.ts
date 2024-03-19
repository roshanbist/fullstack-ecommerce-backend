// controller
// async function
// request and response
// endpoint, method + data
// data: request.params (id), request.body, request. query
// response: status code + data

import express, { Request, Response } from "express";

type Product = {
  id: string;
  name: string;
  price: number;
};

// fake database
let products: Product[] = [
  { id: "1", name: "product1", price: 1 },
  { id: "2", name: "product2", price: 2 },
  { id: "3", name: "product3", price: 3 },
];

// TO DO: async function + try catch
// query
// ?offset=0&limit=10
// search
// filter

// http://localhost:8080/api/v1/products?name=""
// query then pagination

export function getAllProducts(request: Request, response: Response) {
  // query
  const nameQuery = request.query.name as string;
  console.log(request.query, "query");
  const priceQuery = request.query.price as string;

  products = products.filter((product) =>
    product.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  // get product with less than priceQuery
  response.status(200).json(products);
}

export function createProduct(request: Request, response: Response) {
  const newProduct = request.body;
  products.push(newProduct);
  response.status(201).json(products);
}

export function deleteProduct(request: Request, response: Response) {
  const productId = request.params.productId;
  products = products.filter((item) => item.id !== productId);
  response.sendStatus(204);
}
