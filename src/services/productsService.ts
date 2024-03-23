import { FilterQuery } from 'mongoose';

import { BadRequest, NotFoundError } from '../errors/ApiError';
import Product, { ProductDocument } from '../model/ProductModel';
import { FilterProduct } from '../misc/types/Product';

const getAllProducts = async (
  filterProduct: Partial<FilterProduct>
): Promise<ProductDocument[]> => {
  const { limit, offset, min_price, max_price, name = '' } = filterProduct;

  const query: FilterQuery<ProductDocument> = {};

  if (name && name.trim().length > 0) {
    query.name = { $regex: name.toLowerCase() };
  }

  if (min_price !== undefined && max_price !== undefined) {
    query.price = { $gte: min_price, $lte: max_price };
  } else {
    query.price = { $gte: 0, $lte: Infinity };
  }

  const productList = await Product.find(query)

    .sort({ name: 1 })
    .populate({ path: 'category', select: { name: 1 } }) // shows category name only in the product data
    .limit(limit || 10)
    .skip(offset || 0)
    .exec();

  return productList;
};

const createNewProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  const { name, description, price, images, category } = product;

  if (!name || !description || !price || images.length === 0 || !category) {
    throw new BadRequest();
  }

  return await product.save();
};

const updateProduct = async (
  id: string,
  updatedProduct: Partial<ProductDocument>
) => {
  const updatedProductInfo = await Product.findByIdAndUpdate(
    id,
    updatedProduct,
    { new: true }
  );

  if (!updatedProductInfo) {
    throw new NotFoundError();
  }

  return updatedProductInfo;
};

const getProductById = async (
  id: string
): Promise<ProductDocument | undefined> => {
  const foundProduct = await Product.findById(id);

  if (!foundProduct) {
    throw new NotFoundError();
  }

  return foundProduct;
};

const deleteProductById = async (id: string) => {
  const foundProduct = await Product.findByIdAndDelete(id);

  if (!foundProduct) {
    throw new NotFoundError();
  }

  return foundProduct;
};

export default {
  getAllProducts,
  createNewProduct,
  updateProduct,
  getProductById,
  deleteProductById,
};
