import request from 'supertest';

import connect, { MongoHelper } from '../db-helper';
import usersService from '../../src/services/usersService';
// import { createUser } from '../utils/testUtil';
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

    // console.log('admin create vayo', admin);
    const customer = await createUserInService();
    // console.log('customer', customer);

    const users: UserDocument[] = await usersService.getAllUsers();

    // console.log('users', users);

    expect(users.length).toEqual(2);
    expect(users[0]._id).toEqual(admin._id);
    expect(users[1]._id).toEqual(customer._id);
  });

  // create user
  it('should create a user', async () => {
    // const response = await createUser();

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

  // get all users
  // it('should return list of users', async () => {
  //   await createUser();
  //   const userList = await usersService.getAllUsers();
  //   expect(userList.length).toEqual(1);
  // });

  // get userby Id
  it('should return user By id', async () => {
    const newUser = await createUserInService();

    // console.log('created user', newUser.body);
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

  // deleteUser
  // it('should return list of users', async () => {
  //   const newUser = await createUser();
  //   const user = await usersService.deleteUser(newUser.body._id);
  //   // console.log('delete user', user);
  //   expect(user).toHaveProperty('email');
  //   expect(user?.email).toEqual('user1@mail.com');
  //   expect(user).toHaveProperty('_id');
  // });

  // update user
  it('should update user', async () => {
    // const newUser = await createUserInService();
    // const user = await usersService.getUserByEmail(newUser.email);
    // // console.log('update user', user);
    // expect(user).toHaveProperty('firstname');
    // expect(user?.firstname).toEqual('firstname');
    // expect(user?.email).toEqual('user1@mail.com');
    // expect(user).toHaveProperty('_id');

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
    // const plainPassword = '1234';
    // const newUser = await createUserInService(UserRole.Admin, {
    //   password: plainPassword,
    // });
    // const findUser = await usersService.findOrCreateUser(
    //   newUser.body,
    //   plainPassword
    // );
    // console.log('find user', findUser);
    // console.log('update user', findUser);
    // expect(findUser).toHaveProperty('firstname');
    // expect(findUser?.firstname).toEqual('firstname');
    // expect(findUser?.email).toEqual('user1@mail.com');
    // expect(findUser).toHaveProperty('_id');
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
