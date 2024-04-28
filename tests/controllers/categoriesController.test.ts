import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import { CategoryDocument } from '../../src/model/CategoryModel';
import { UserRole } from '../../src/misc/types/User';
import { Category } from '../../src/misc/types/Category';

import {
  createCategory,
  createCategoryWithAcessToken,
  createUserAndLoginAndGetAccessToken,
} from '../utils/controllerUtil';

describe('category controller test', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  it('should return a list of categories', async () => {
    const initResponse = await request(app).get('/api/v1/categories');
    expect(initResponse.status).toBe(200);
    expect(initResponse.body).toHaveLength(0);
  });

  it('should return a category with categoryId', async () => {
    const categoryResponse = await createCategoryWithAcessToken(UserRole.Admin);

    const category: CategoryDocument = categoryResponse.body;

    const response = await request(app).get(
      `/api/v1/categories/${category._id}`
    );
    expect(response.status).toBe(200);
  });

  it('should create a category if user is an admin', async () => {
    const categoryResponse = await createCategoryWithAcessToken(UserRole.Admin);

    const category: CategoryDocument = categoryResponse.body;

    expect(categoryResponse.status).toBe(201);
    expect(category).toMatchObject({
      name: category.name,
      image: category.image,
      _id: expect.any(String),
      __v: expect.any(Number),
    });
  });

  it('cannot create a category if user is a customer', async () => {
    const categoryResponse = await createCategoryWithAcessToken(
      UserRole.Customer
    );

    expect(categoryResponse.status).toBe(403); // Forbidden
  });

  it('should update a category', async () => {
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );
    const createCategoryResponse = await createCategory(accessToken);
    const category: CategoryDocument = createCategoryResponse.body;

    const categoryUpdateData: Partial<Category> = {
      name: 'updated name',
      image: 'http://updatedImage.png',
    };

    const response = await request(app)
      .put(`/api/v1/categories/${category._id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(categoryUpdateData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: category._id,
      __v: category.__v,
      name: categoryUpdateData.name,
      image: categoryUpdateData.image,
    });
  });

  it('should delete a category', async () => {
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );
    const createCategoryResponse = await createCategory(accessToken);

    const category: CategoryDocument = createCategoryResponse.body;

    const response = await request(app)
      .delete(`/api/v1/categories/${category._id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(response.status).toBe(204);
  });
});
