import { FilterQuery } from 'mongoose';

import { BadRequest, NotFoundError } from '../errors/ApiError';
import Product, { ProductDocument } from '../model/ProductModel';
import { FilterProduct, ProductsList } from '../misc/types/Product';

const getAllProducts = async (
  filterProduct: Partial<FilterProduct>
): Promise<ProductsList> => {
  const {
    limit = 0,
    offset = 0,
    min_price,
    max_price,
    name,
    categoryId,
    size,
  } = filterProduct;

  const query: FilterQuery<ProductDocument> = {};

  if (name && name.trim().length > 0) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (min_price) {
    query.price = { $gte: min_price };
  }

  if (max_price) {
    query.price = { ...query.price, $lte: max_price };
  }

  if (categoryId) {
    query.category = categoryId;
  }

  if (size) {
    query.size = size;
  }

  const total: number = await Product.find(query).countDocuments();
  const products: ProductDocument[] = await Product.find(query)
    // TODO: We need to think about the price asc/desc
    .sort({ name: 1 }) // shows product with name in ascending order
    .populate({ path: 'category' }) // shows category detail in the product data
    .limit(limit)
    .skip(offset)
    .exec();

  if (!products) {
    throw new NotFoundError();
  }

  return {
    total,
    products,
  };
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

const getProductById = async (id: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(id).populate('category');

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
