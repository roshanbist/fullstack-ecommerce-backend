import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import usersService from '../../src/services/usersService';
import { createUser } from '../utils/testUtil';
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
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('role');
    expect(response.body).toHaveProperty('firstName');
  });

  // get all users
  it('should return list of users', async () => {
    await createUser();
    const userList = await usersService.getAllUsers();
    expect(userList.length).toEqual(1);
  });

  // get userby Id
  it('should return user By id', async () => {
    const newUser = await createUser();
    console.log('created user', newUser.body);
    const user = await usersService.getUserById(newUser.body._id);
    if (user) {
      expect(user).toHaveProperty('email');
      expect(user.email).toEqual('user1@mail.com');
      expect(user).toHaveProperty('_id');
    }
  });

  // get user by email
  it('should return user by email', async () => {
    const newUser = await createUser();
    const user = await usersService.getUserByEmail(newUser.body.email);
    if (user) {
      expect(user).toHaveProperty('email');
      expect(user.email).toEqual('user1@mail.com');
      expect(user).toHaveProperty('_id');
    }
  });

  // deleteUser
  it('should return list of users', async () => {
    const newUser = await createUser();
    const user = await usersService.deleteUser(newUser.body._id);
    // console.log('delete user', user);
    expect(user).toHaveProperty('email');
    expect(user?.email).toEqual('user1@mail.com');
    expect(user).toHaveProperty('_id');
  });

  // update user
  it('should update user', async () => {
    const newUser = await createUser();
    const user = await usersService.getUserByEmail(newUser.body.email);
    console.log('update user', user);
    expect(user).toHaveProperty('firstName');
    expect(user?.firstName).toEqual('firstName');
    expect(user?.email).toEqual('user1@mail.com');
    expect(user).toHaveProperty('_id');
  });

  // find or create user
  it('should create a new user if not found', async () => {
    const plainPassword = '1234'
    const newUser = await createUser(UserRole.Admin, { password: plainPassword });
    const findUser = await usersService.findOrCreateUser(newUser.body, plainPassword);
    console.log('find user', findUser);
    console.log('update user', findUser);
    expect(findUser).toHaveProperty('firstName');
    expect(findUser?.firstName).toEqual('firstName');
    expect(findUser?.email).toEqual('user1@mail.com');
    expect(findUser).toHaveProperty('_id');
  });
});
