import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import usersService from '../../src/services/usersService';
import { User, UserRole } from '../../src/misc/types/User';
import { createUserInService } from '../utils/serviceUtil';
import UserModel, { UserDocument } from '../../src/model/UserModel';
import { getUserInfo } from '../utils/controllerUtil';
import { PasswordUpdate } from '../../src/misc/types/Password';

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

  it('should get a list of users', async () => {
    const admin: UserDocument = await createUserInService(UserRole.Admin);

    const customer = await createUserInService();

    const users: UserDocument[] = await usersService.getAllUsers();

    expect(users.length).toEqual(2);
    expect(users[0]._id).toEqual(admin._id);
    expect(users[1]._id).toEqual(customer._id);
  });

  // create user
  it('should create a user', async () => {
    const newUser = await createUserInService(UserRole.Customer);

    expect(newUser).toHaveProperty('_id');
    expect(newUser).toHaveProperty('firstname');
    expect(newUser).toHaveProperty('lastname');
    expect(newUser).toHaveProperty('username');
    expect(newUser).toHaveProperty('address');
    expect(newUser).toHaveProperty('avatar');
    expect(newUser).toHaveProperty('email');
    expect(newUser).toHaveProperty('password');
    expect(newUser).toHaveProperty('role');
    expect(newUser).toHaveProperty('active');
  });

  // get userby Id
  it('should return user By id', async () => {
    const newUser = await createUserInService();

    const foundUser = await usersService.getUserById(newUser._id);

    if (foundUser) {
      expect(foundUser._id).toEqual(newUser._id);
      expect(foundUser).toHaveProperty('email');
      expect(foundUser.email).toEqual('user1@mail.com');
    }
  });

  // get user by email
  it('should return user by email', async () => {
    const newUser = await createUserInService();
    const foundUser = await usersService.getUserByEmail(newUser.email);
    if (foundUser) {
      expect(foundUser._id).toEqual(newUser._id);
      expect(foundUser.email).toEqual(newUser.email);
    }
  });

  // update user
  it('should update user', async () => {
    const user: UserDocument = await createUserInService(UserRole.Customer);

    const updateInfo: Partial<User> = {
      username: 'Updated name',
    };

    const updatedUser = (await usersService.updateUser(
      user._id,
      updateInfo
    )) as UserDocument;

    expect(updatedUser._id).toEqual(user._id);
    expect(updatedUser.username).toBe(updateInfo.username);
  });

  // find or create user
  it('should create a new user if not found', async () => {
    const user: UserDocument = await createUserInService(UserRole.Customer);
    const adminInfo: Partial<User> = getUserInfo(UserRole.Admin);
    const adminUser: UserDocument = new UserModel(adminInfo);

    // Check with registered user
    const existedUser = (await usersService.findOrCreateUser(
      user,
      ''
    )) as UserDocument;
    expect(existedUser.email).toBe(user.email);

    // Check with newly created user
    const expectedNewUser = (await usersService.findOrCreateUser(
      adminUser,
      ''
    )) as UserDocument;

    expect(expectedNewUser.email).toBe(adminUser.email);
  });

  it('should delete a user by user id', async () => {
    const user: UserDocument = await createUserInService(UserRole.Customer);
    const deletedUser = (await usersService.deleteUser(
      user._id
    )) as UserDocument;

    expect(deletedUser._id).toEqual(user._id);
  });

  it('should update user password', async () => {
    const user: UserDocument = await createUserInService(UserRole.Customer);
    const passwordInfo: PasswordUpdate = {
      oldPassword: user.password,
      newPassword: 'updatedPassword',
    };

    user.password = passwordInfo.newPassword;
    const updatedUser = (await usersService.updateUser(
      user._id,
      user
    )) as UserDocument;

    expect(user.password).toBe(updatedUser.password);
  });
});
