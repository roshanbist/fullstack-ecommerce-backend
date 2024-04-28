import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import {
  createUser,
  createUserAndLoginAndGetAccessToken,
  customerAuth,
  login,
  user,
} from '../utils/controllerUtil';
import { UserRole, User } from '../../src/misc/types/User';

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
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('firstname');
    expect(response.body).toHaveProperty('email');
    expect(response.body.firstname).toBe('firstName');
    expect(response.body.email).toBe('user1@mail.com');
    expect(response.body.username).toBeTruthy();
    expect(response.body.role).toBe('customer');
    expect(response.body).toMatchObject({
      firstname: 'firstName',
      lastname: 'lastName',
      username: 'userName',
      avatar: 'http://avatar.png',
      address: 'address',
      _id: expect.any(String),
      __v: expect.any(Number),
    });
  });

  // getAllUser
  it('should return list of user when user is an admin and valid token', async () => {
    await createUser(UserRole.Customer);

    const accessToken = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });

  it('should not return list of users when user role is customer and valid token', async () => {
    const accessToken = await createUserAndLoginAndGetAccessToken(
      UserRole.Customer
    );
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({});
  });

  // get  user by id
  it('should return user by userId', async () => {
    const newUser = await createUser(UserRole.Customer);
    const loginRes = await login(UserRole.Customer);
    const accessToken = loginRes.body.tokens.accessToken;

    const response = await request(app)
      .get(`/api/v1/users/${newUser.body._id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(newUser.body._id);
    expect(response.body).toEqual(newUser.body);
  });

  it('should return a user by loggedInfo', async () => {
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Customer
    );
    const response = await request(app)
      .get(`/api/v1/users/profile`)
      .set('Authorization', 'Bearer ' + accessToken);

    const loggedUser: User = response.body;

    expect(response.status).toBe(200);
    expect(loggedUser.email).toEqual(customerAuth.email);
  });

  it('should return error when same email check', async () => {
    await createUser();
    const { email } = customerAuth;

    const response = await request(app)
      .post(`/api/v1/users/check-email`)
      .send({ email });

    expect(response.status).toBe(400);
  });

  it('should return user info by login', async () => {
    const newUser = await createUser(UserRole.Customer);
    const response = await login(UserRole.Customer);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tokens');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toMatchObject({
      tokens: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
      user: newUser.body,
    });
  });

  it('should update user with update info', async () => {
    const accessToken = await createUserAndLoginAndGetAccessToken(
      UserRole.Customer
    );
    const updatedname: string = 'new name';
    const response = await request(app)
      .put(`/api/v1/users`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        username: updatedname,
      });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updatedname);
  });

  it('should update user password', async () => {
    const accessToken = await createUserAndLoginAndGetAccessToken(
      UserRole.Customer
    );

    const response = await request(app)
      .put(`/api/v1/users`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        oldPassword: customerAuth.password,
        newPassword: 'newPassword',
      });

    expect(response.status).toBe(200);
    expect(response.body.password).not.toBe(customerAuth.password);
  });

  it('should delete user when user is an admin', async () => {
    const customer = await createUser(UserRole.Customer);
    const accessToken: string = await createUserAndLoginAndGetAccessToken(
      UserRole.Admin
    );

    const response = await request(app)
      .delete(`/api/v1/users/${customer.body._id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
