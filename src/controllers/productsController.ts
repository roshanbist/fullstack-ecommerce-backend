import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import productsService from '../services/productsService';
import Product, { ProductDocument } from '../model/ProductModel';
import {
  BadRequest,
  InternalServerError,
  NotFoundError,
} from '../errors/ApiError';
import { FilterProduct, ProductsList } from '../misc/types/Product';

// Get all the products list
export async function getAllProducts(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const filterProduct: Partial<FilterProduct> = request.query;
    // console.log('offset from be', filterProduct);
    const productsList: ProductsList = await productsService.getAllProducts(
      filterProduct
    );
    return response.status(200).json(productsList);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(
        new BadRequest(error.message ?? 'Bad request to get products')
      );
    }

    if (error instanceof NotFoundError) {
      return response.status(404).json({ message: 'Products not found' });
    }

    next(new InternalServerError('Server error occured'));
  }
}

// Create new product
export async function createNewProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = request.body;
    const newData = new Product(request.body);

    if (categoryId) {
      newData.category = categoryId;
    }

    const newProductData = await productsService.createNewProduct(newData);
    response.status(201).json(newProductData);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(
        new BadRequest(error.message ?? 'Wrong data format to create product')
      );
    }

    if (error instanceof BadRequest) {
      return response.status(400).json({ message: 'Incomplete product data' });
    }

    next(new InternalServerError('Serve error occured'));
  }
}

// Update product
export async function updateProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = request.body;

    const newData: Partial<ProductDocument> = request.body;
    if (categoryId) {
      newData.category = categoryId;
    }
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
    } else if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequest(error.message ?? 'wrong id format'));
    }

    next(new InternalServerError('Server error occured'));
  }
}

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
    } else if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequest(error.message ?? 'wrong product id format'));
    }

    next(new InternalServerError('Server error occured'));
  }
}

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
    } else if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequest(error.message ?? 'wrong product id format'));
    }

    next(new InternalServerError('Server error occured'));
  }
}
