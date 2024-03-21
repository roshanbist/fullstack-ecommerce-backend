import { NextFunction, Request, Response } from 'express';

import productsService from '../services/productsService';
import Product, { ProductDocument } from '../model/ProductModel';
import {
  BadRequest,
  InternalServerError,
  NotFoundError,
} from '../errors/ApiError';
import mongoose from 'mongoose';

// #Roshan
// Get all the products list
export async function getAllProducts(
  _: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const productsList = await productsService.getAllProducts();
    response.status(200).json(productsList);
  } catch (error) {
    next(new InternalServerError('Serve error occured'));
  }
}

// #Roshan
// Create new product
export async function createNewProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const newData = new Product(request.body);
    const newProductData = await productsService.createNewProduct(newData);
    response.status(201).json(newProductData);
  } catch (error) {
    if (error instanceof BadRequest) {
      return response.status(400).json({ message: 'Incomplete product data' });
    }

    next(new InternalServerError('Serve error occured'));
  }
}

// #Roshan
// Update product
export async function updateProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const newData: Partial<ProductDocument> = request.body;
    const updatedProduct = await productsService.updateProduct(
      request.params.productId,
      newData
    );

    response.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return response.status(404).json({
        message: `No matched product with id ${request.params.productId} found`,
      });
    }

    if (error instanceof mongoose.Error.CastError) {
      return response.status(404).json({
        message: 'wrong id format',
      });
    }

    next(new InternalServerError('Server error occured'));
  }
}

// #Roshan
// Get product by Id
export async function getProductById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const productId = request.params.productId;

    const singleProductData = await productsService.getProductById(productId);
    response.status(200).json(singleProductData);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return response.status(404).json({
        message: `No matched product with id ${request.params.productId} found`,
      });
    }

    if (error instanceof mongoose.Error.CastError) {
      return response.status(404).json({
        message: 'wrong product id format',
      });
    }

    next(new InternalServerError('Server error occured'));
  }
}

// #Roshan
// Delete product by Id
export async function deleteProductById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const productId = request.params.productId;
    await productsService.deleteProductById(productId);
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return response.status(404).json({
        message: `No matched product with id ${request.params.productId} found`,
      });
    }

    if (error instanceof mongoose.Error.CastError) {
      return response.status(404).json({
        message: 'wrong product id format',
      });
    }

    next(new InternalServerError('Server error occured'));
  }
}
