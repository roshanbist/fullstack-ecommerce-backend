import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import { createUser, createUserAndLoginAndGetAccessToken, login } from '../utils/testUtil';
import { UserRole } from '../../src/misc/types/User';

// tear down
describe('user controller test', () => {
  // connect db
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

  //test suit
  // create user
  it('should create a user', async () => {
    const response = await createUser();
    // console.log('response....', response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('email');
    expect(response.body.firstName).toBe('firstName');
    expect(response.body.email).toBe('user1@mail.com');
    expect(response.body.userName).toBeTruthy();
    expect(response.body.role).toBe('customer');
    expect(response.body).toMatchObject({
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      avatar: 'http://avatar.png',
      address: 'address',
      _id: expect.any(String),
      __v: expect.any(Number),
    });
  });

  // getAllUser
  it('should return list of user when user is an admin and valid token', async () => {
    const accessToken = await createUserAndLoginAndGetAccessToken(UserRole.Admin);
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  });

  it('should not return list of user when user role is customer and valid token', async () => {
    const accessToken = await createUserAndLoginAndGetAccessToken(UserRole.Customer);
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({});
  });

  // get  user by id
  it('should return list of user when user is an admin and valid token', async () => {
    const newUser = await createUser(UserRole.Admin);
    const userlogin = await login();
    const response = await request(app).post(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  });

  it('should not return list of user when user role is customer and valid token', async () => {
    const newUser = await createUser(UserRole.Customer);
    const userlogin = await login();
    const response = await request(app).post(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({});
  });

  // user login
  it('should return user based on email', async () => {
    const createdNewUser = await login();
    const { email, password } = createdNewUser.body;
    const response = await request(app).post('/api/v1/users/login').send({ email, password });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  // delete user
  it('should delete user when user is an admin and valid token', async () => {
    const newUser = await createUser(UserRole.Admin);
    const userlogin = await login();
    const response = await request(app).delete(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('should delete user when user  role is a customer and valid token', async () => {
    const newUser = await createUser(UserRole.Customer);
    const userlogin = await login();
    const response = await request(app).delete(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  // update user
  it('should update user when user  role is an Admin and valid token', async () => {
    const newUser = await createUser(UserRole.Admin);
    const userlogin = await login();
    const response = await request(app).put(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(200);
  });

  it('should update user when user  role is a customer and valid token', async () => {
    const newUser = await createUser(UserRole.Customer);
    const userlogin = await login();
    const response = await request(app).put(`/api/v1/users/${newUser.body._id}`);
    expect(response.status).toBe(200);
  });
});
