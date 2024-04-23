import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import { Product } from '../../src/misc/types/Product';
import {
  createUser,
  createUserAndLoginAndGetAccessToken,
} from '../utils/testUtil';
import { UserRole } from '../../src/misc/types/User';
import { ProductDocument } from '../../src/model/ProductModel';
import { createCategory } from './categoriesController.test';

export const productData: Partial<Product> = {
  title: 'product1',
  description: 'product1 available',
  price: 10,
  images: ['product1 image1', 'product1 image2'],
};

export function getProductData(data: Partial<Product>, categoryId: string) {
  return {
    title: data.title,
    description: data.description,
    price: data.price,
    images: data.images,
    category: categoryId,
  };
}

async function createProduct(accessToken: string, categoryId: string) {
  const productNewData = getProductData(productData, categoryId);
  const response = await request(app)
    .post('/api/v1/products')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(productNewData);

  return response;
}

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

    expect(productResponse.status).toBe(201);
    expect(productResponse.body).toMatchObject({
      name: productResponse.body.name,
      description: productResponse.body.description,
      _id: expect.any(String),
      __v: expect.any(Number),
    });
  });

  it('should not create a product if user is customer', async () => {
    // create user, login user and get access token
    // First user is always admin
    // Create second user
    await createUser(UserRole.Admin, { email: 'admin@mail.com' });
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Customer
    );

    // create category
    const categoryData = await createCategory(accessToken);

    // pass access token to create a product
    const productResponse = await createProduct(
      accessToken,
      categoryData.body._id
    );
    expect(productResponse.status).toBe(403);
  });

  it('should get a single product detail by id', async () => {
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

    const product: ProductDocument = productResponse.body;

    const singleProductData = await request(app).get(
      `/api/v1/products/${product._id}`
    );

    expect(singleProductData.status).toBe(200);
    expect(singleProductData.body).toHaveProperty('title', product.title);
    expect(singleProductData.body).toHaveProperty(
      'description',
      product.description
    );
  });

  it('should update a product if user is admin', async () => {
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

    const productUpdateData: Partial<ProductDocument> = {
      title: 'Product1 new name',
      price: 50,
    };

    const productUpdateResponse = await request(app)
      .put(`/api/v1/products/${productResponseData._id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(productUpdateData);

    expect(productUpdateResponse.status).toBe(200);
    expect(productUpdateResponse.body).toMatchObject({
      title: productUpdateData.title,
      price: productUpdateData.price,
      _id: productResponseData._id,
      __v: productResponseData.__v,
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
