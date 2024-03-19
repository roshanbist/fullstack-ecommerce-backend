import { Request, Response } from 'express';
import productsService from '../services/productsService';
import Product from '../model/ProductModel';

// #Roshan
// Get all the products list
export async function getAllProducts(_: Request, response: Response) {
  const productsList = await productsService.getAllProducts();
  response.status(200).json(productsList);
}

// #Roshan
// Create new product
export async function createNewProduct(request: Request, response: Response) {
  const newData = new Product(request.body);
  const newProductData = await productsService.createNewProduct(newData);
  response.status(201).json(newProductData);
}

// #Roshan
export async function getProductById(request: Request, response: Response) {
  const productId = request.params.productId;

  const singleProductData = await productsService.getProductById(productId);
  response.status(200).json(singleProductData);
}

// #Roshan
export async function deleteProductById(request: Request, response: Response) {
  const productId = request.params.productId;
  await productsService.deleteProductById(productId);
  response.sendStatus(204);
}
