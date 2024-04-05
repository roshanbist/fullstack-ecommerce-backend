import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';

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
});
