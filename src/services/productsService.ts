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
    title,
    category,
    size,
  } = filterProduct;

  const query: FilterQuery<ProductDocument> = {};

  if (title && title.trim().length > 0) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (min_price) {
    query.price = { $gte: min_price };
  }

  if (max_price) {
    query.price = { ...query.price, $lte: max_price };
  }

  if (category) {
    query.category = category;
  }

  if (size) {
    query.size = size;
  }

  const total: number = await Product.find(query).countDocuments();
  const products: ProductDocument[] = await Product.find(query)
    // TODO: We need to think about the price asc/desc
    .sort({ title: 1 }) // shows product with title in ascending order
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
  const { title, description, price, images, category } = product;

  if (!title || !description || !price || images.length === 0 || !category) {
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
