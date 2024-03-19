import Product, { ProductDocument } from '../model/ProductModel';

const getAllProducts = async (): Promise<ProductDocument[]> => {
  return await Product.find();
};

const createNewProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return await product.save();
};

const getProductById = async (
  id: string
): Promise<ProductDocument | undefined> => {
  const foundProduct = await Product.findById(id);

  if (foundProduct) {
    return foundProduct;
  }
};

const deleteProductById = async (id: string) => {
  const foundProduct = await Product.findByIdAndDelete(id);

  if (foundProduct) {
    return foundProduct;
  }
};

export default {
  getAllProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
};
