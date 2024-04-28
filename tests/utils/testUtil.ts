import request from 'supertest';

import app from '../../src/app';
import { User, UserRole } from '../../src/misc/types/User';
import { JwtTokens } from '../../src/misc/types/JwtPayload';
import { UserDocument } from '../../src/model/UserModel';
import { Order, OrderItem, OrderStatus } from '../../src/misc/types/Order';
import { Product } from '../../src/misc/types/Product';
import { Size } from '../../src/misc/types/Size';
import { Category } from '../../src/misc/types/Category';

const userAuth = {
  email: 'user1@mail.com',
  password: 'user1Password',
};

const user: Partial<User> = {
  firstname: 'firstName',
  lastname: 'lastName',
  username: 'userName',
  avatar: 'http://avatar.png',
  address: 'address',
  active: true,
  ...userAuth,
};

export async function createUser(
  role: UserRole = UserRole.Customer,
  customerUser: Partial<User> | null = null
) {
  return await request(app)
    .post('/api/v1/users')
    .send({ ...user, ...customerUser, role });
}

export async function login() {
  return await request(app).post('/api/v1/users/login').send(userAuth);
}

export async function createUserAndLoginAndGetAccessToken(
  role: UserRole = UserRole.Customer
): Promise<string> {
  await createUser(role);
  const loggedinInfo = await login();
  const tokens: JwtTokens = loggedinInfo.body.tokens;

  return tokens.accessToken;
}
