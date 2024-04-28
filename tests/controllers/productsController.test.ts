import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import { Product } from '../../src/misc/types/Product';
// import {
//   createUser,
//   createUserAndLoginAndGetAccessToken,
// } from '../utils/testUtil';
import { UserRole } from '../../src/misc/types/User';
import { ProductDocument } from '../../src/model/ProductModel';
import {
  createCategory,
  createUserAndLoginAndGetAccessToken,
  createProductAndCategoryWithAuth,
  getProductData,
  createProduct,
} from '../utils/controllerUtil';

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

// async function createProduct(accessToken: string, categoryId: string) {
//   const productNewData = getProductData(productData, categoryId);
//   const response = await request(app)
//     .post('/api/v1/products')
//     .set('Authorization', 'Bearer ' + accessToken)
//     .send(productNewData);

//   console.log('response k aayo', response.body);

//   return response;
// }

describe('product controller test', () => {
  let mongoHelper: MongoHelper;

  //connect to database
  beforeAll(async () => {
    mongoHelper = await connect();
  });

  // close database
  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  // clear database after each test
  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  // test suites

  it('should get all the products', async () => {
    const response = await request(app).get('/api/v1/products');
    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(0);
  });

  it('should create a product if user is admin', async () => {
    // create user, login user and get access token
    // const accessToken: string = await createUserAndLoginAndGetAccessToken(
    //   UserRole.Admin
    // );

    // create category
    // const categoryData = await createCategory(accessToken);

    // pass access token to create a product
    // const productResponse = await createProduct(
    //   accessToken,
    //   categoryData.body._id
    // );

    const productResponse = await createProductAndCategoryWithAuth(
      UserRole.Admin
    );

    expect(productResponse.status).toBe(201);
    expect(productResponse.body).toMatchObject({
      title: productResponse.body.title,
      description: productResponse.body.description,
      _id: expect.any(String),
      __v: expect.any(Number),
    });
  });

  it('should not create a product if user is customer', async () => {
    // create user, login user and get access token
    // First user is always admin
    // Create second user
    // await createUser(UserRole.Admin, { email: 'admin@mail.com' });
    // const accessToken: string = await createUserAndLoginAndGetAccessToken(
    //   UserRole.Customer
    // );

    // // create category
    // const categoryData = await createCategory(accessToken);

    // pass access token to create a product
    // const productResponse = await createProduct(
    //   accessToken,
    //   categoryData.body._id
    // );

    const productResponse = await createProductAndCategoryWithAuth(
      UserRole.Customer
    );
    expect(productResponse.status).toBe(403);
  });

  it('should get a single product detail by id', async () => {
    // create user, login user and get access token
    // const accessToken: string = await createUserAndLoginAndGetAccessToken(
    //   UserRole.Admin
    // );

    // // create category
    // const categoryData = await createCategory(accessToken);

    // // pass access token to create a product
    // const productResponse = await createProduct(
    //   accessToken,
    //   categoryData.body._id
    // );

    // const product: ProductDocument = productResponse.body;

    const productResponse = await createProductAndCategoryWithAuth(
      UserRole.Admin
    );

    const productData: ProductDocument = productResponse.body;

    const singleProductResponse = await request(app).get(
      `/api/v1/products/${productData._id}`
    );

    const singleProductData: ProductDocument = singleProductResponse.body;

    expect(singleProductResponse.status).toBe(200);
    expect(singleProductData).toHaveProperty('title', productData.title);
    expect(singleProductData).toHaveProperty(
      'description',
      productData.description
    );
    // expect(productData).toEqual(singleProductData);
  });

  it('should update a product if user is admin', async () => {
    // create product with auth
    const productOriginalResponse = await createProductAndCategoryWithAuth(
      UserRole.Admin
    );

    const productOriginalData = productOriginalResponse.body;

    // console.log('product origin', productOriginalData);
    // create user, login user and get access token
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );

    // create category
    // const categoryData = await createCategory(accessToken);

    // pass access token to create a product
    // const productResponse = await createProduct(
    //   accessToken,
    //   categoryData.body._id
    // );

    // const productResponseData: ProductDocument = productResponse.body;

    const productUpdateData: Partial<Product> = {
      title: 'Product1 new name',
      price: 50,
    };

    const productUpdateResponse = await request(app)
      .put(`/api/v1/products/${productOriginalData._id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(productUpdateData);

    // console.log('product update response', productUpdateResponse.body);

    expect(productUpdateResponse.status).toBe(200);
    expect(productUpdateResponse.body).toMatchObject({
      title: productUpdateData.title,
      price: productUpdateData.price,
      _id: productOriginalData._id,
      __v: productOriginalData.__v,
    });
  });

  it('should delete a product if user is admin', async () => {
    // create user, login user and get access token
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );

    // create category
    const categoryData = await createCategory(accessToken);

    // pass access token to create a product
    const productResponse = await createProduct(
      accessToken,
      categoryData.body._id
    );

    const productResponseData: ProductDocument = productResponse.body;

    const productDeleteResponse = await request(app)
      .delete(`/api/v1/products/${productResponseData._id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(productDeleteResponse.status).toBe(204);
  });
});
