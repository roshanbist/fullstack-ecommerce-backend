import request from 'supertest';

import app from '../../src/app';
import { User, UserRole, UserAuth } from '../../src/misc/types/User';
import { JwtTokens } from '../../src/misc/types/JwtPayload';
import { UserDocument } from '../../src/model/UserModel';
import { Order, OrderItem, OrderStatus } from '../../src/misc/types/Order';
import { Product } from '../../src/misc/types/Product';
import { Size } from '../../src/misc/types/Size';
import { Category } from '../../src/misc/types/Category';

// const userAuth = {
//   email: 'user1@mail.com',
//   password: 'user1Password',
// };

export const customerAuth: UserAuth = {
  email: 'user1@mail.com',
  password: 'user1Password',
};

export const adminAuth: UserAuth = {
  email: 'admin@mail.com',
  password: 'admin1Password',
};

export const user: Partial<User> = {
  firstname: 'firstName',
  lastname: 'lastName',
  username: 'userName',
  avatar: 'http://avatar.png',
  address: 'address',
  active: true,
  //   ...userAuth,
};

export const getUserInfo = (role: UserRole = UserRole.Customer) => {
  let auth: UserAuth = customerAuth;
  if (role === UserRole.Admin) {
    auth = adminAuth;
  }

  console.log('role k cha', role);

  return { ...user, ...auth, role };
};

export async function createUser(
  role: UserRole = UserRole.Customer
  //   customerUser: Partial<User> | null = null
) {
  const userInfo: Partial<User> = getUserInfo(role);

  return await request(app).post('/api/v1/users').send(userInfo);
  // .send({ ...user, ...customerUser, role });
}

export async function login(role: UserRole = UserRole.Customer) {
  let loginDetail: UserAuth = customerAuth;

  if (role === UserRole.Admin) {
    loginDetail = adminAuth;
  }

  //   return await request(app).post('/api/v1/users/login').send(userAuth);
  return await request(app).post('/api/v1/users/login').send(loginDetail);
}

export async function createUserAndLoginAndGetAccessToken(
  role: UserRole = UserRole.Customer
): Promise<string> {
  console.log('role k aayo', role);
  await createUser(role);
  //   const loggedinInfo = await login();
  const loggedinInfo = await login(role);

  const tokens: JwtTokens = loggedinInfo.body.tokens;

  return tokens.accessToken;
}

export async function createCategoryWithAcessToken(
  role: UserRole = UserRole.Customer
) {
  const accessToken: string = await createUserAndLoginAndGetAccessToken(role);
  return createCategory(accessToken);
}

export async function createCategory(accessToken: string) {
  const categoryData: Category = getCategoryData();
  const response = await request(app)
    .post('/api/v1/categories')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(categoryData);

  return response;
}

export function getCategoryData(name: string = 'category1'): Category {
  return {
    name: name,
    image: `http://${name}_image.png`,
  };
}

// export function getProductData(categoryId: string): Partial<Product> {
//   return {
//     title: 'product1',
//     sizes: [Size.Medium, Size.Large],
//     price: 35,
//     description: 'Product1 description',
//     images: ['http://product1_image1.png', 'http://product1_image2.png'],
//     category: categoryId, // backend category id ref
//     // createdAt: Date ==> is missing here since backend generates
//   };
// }

// export const productData: Partial<Product> = {
//   title: 'product1',
//   description: 'product1 available',
//   price: 10,
//   images: ['product1 image1', 'product1 image2'],
// };

// export function getProductData(data: Partial<Product>, categoryId: string) {
//   return {
//     title: data.title,
//     description: data.description,
//     price: data.price,
//     images: data.images,
//     category: categoryId,
//   };
// }

// export async function createProduct(accessToken: string, categoryId: string) {
//   const productNewData = getProductData(categoryId);
//   const response = await request(app)
//     .post('/api/v1/products')
//     .set('Authorization', 'Bearer ' + accessToken)
//     .send(productNewData);

//   return response;
// }

// export async function createProductAndCategoryWithAuth(role: UserRole = UserRole.Customer) {
//   const accessToken: string = await createUserAndLoginAndGetAccessToken(role);

//   const categoryData = await createCategory(accessToken);
//   return await createProduct(accessToken, categoryData.body._id);
// }

export function getProductData(categoryId: string): Partial<Product> {
  return {
    title: 'product1',
    size: [Size.Medium, Size.Large],
    price: 35,
    description: 'Product1 description',
    images: ['http://product1_image1.png', 'http://product1_image2.png'],
    category: categoryId, // backend category id ref
    // createdAt: Date ==> is missing here since backend generates
  };
}

export async function createProduct(accessToken: string, categoryId: string) {
  const productNewData = getProductData(categoryId);
  const response = await request(app)
    .post('/api/v1/products')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(productNewData);

  console.log('response body', response.body);

  return response;
}

export async function createProductAndCategoryWithAuth(
  role: UserRole = UserRole.Customer
) {
  const accessToken: string = await createUserAndLoginAndGetAccessToken(role);

  const categoryData = await createCategory(accessToken);
  return await createProduct(accessToken, categoryData.body._id);
}
