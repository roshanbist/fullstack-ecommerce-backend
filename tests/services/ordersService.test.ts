import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import usersService from '../../src/services/usersService';
import { createOrder, createUser } from '../utils/testUtil';

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
    const user = await createUser();
    console.log('user', user.body);
    const response = await createOrder(user.body._id);
    console.log('created order', response);
   
  });
});
