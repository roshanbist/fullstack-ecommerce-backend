import { Category } from '../../src/misc/types/Category';
import { Product } from '../../src/misc/types/Product';
import { User, UserRole } from '../../src/misc/types/User';

import CategoryModel, { CategoryDocument } from '../../src/model/CategoryModel';
import ProductModel, { ProductDocument } from '../../src/model/ProductModel';
import UserModel, { UserDocument } from '../../src/model/UserModel';

import productsService from '../../src/services/productsService';
import categoriesService from '../../src/services/categoriesService';
import usersService from '../../src/services/usersService';

import { getCategoryData, getProductData, getUserInfo } from './controllerUtil';

export const createCategoryInService = async (): Promise<CategoryDocument> => {
  const categoryInfo: Category = getCategoryData();
  const categoryDocument: CategoryDocument = new CategoryModel(categoryInfo);
  const newCategory = await categoriesService.createCategory(categoryDocument);

  return newCategory;
};

export const createProductInService = async (): Promise<ProductDocument> => {
  const category: CategoryDocument = await createCategoryInService();
  const productInfo: Partial<Product> = getProductData(category._id);
  const newProduct: ProductDocument = new ProductModel(productInfo);

  return await productsService.createNewProduct(newProduct);
};

export const createUserInService = async (
  role: UserRole = UserRole.Customer
): Promise<UserDocument> => {
  const userData: Partial<User> = getUserInfo(role);
  // console.log('userinfo', userData);
  const newUser: UserDocument = new UserModel(userData);
  const newUserData = await usersService.createUser(newUser);

  return newUserData as UserDocument;
};
