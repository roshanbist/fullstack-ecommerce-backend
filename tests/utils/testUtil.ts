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
  firstName: 'firstName',
  lastName: 'lastName',
  userName: 'userName',
  avatar: 'http://avatar.png',
  address: 'address',
  ...userAuth,
};

export async function createUser(role: UserRole = UserRole.Customer) {
  return await request(app)
    .post('/api/v1/users')
    .send({ ...user, role });
}

export async function login() {
  return await request(app).post('/api/v1/users/login').send(userAuth);
}

export async function createUserAndLoginAndGetAccessToken(role: UserRole = UserRole.Customer): Promise<string> {
  await createUser(role);
  const loggedinInfo = await login();
  const tokens: JwtTokens = loggedinInfo.body.tokens;

  return tokens.accessToken;
}

// const testUser: User = {
//   firstName: 'firstName',
//   lastName: 'lastName',
//   userName: 'userName',
//   avatar: 'http://avatar.png',
//   address: 'address',
//   email: 'user1@mail.com',
//   password: 'user1Password',
//   active: true,
//   role: UserRole.Customer,
// };

// const testCategory: Category = {
//   name: 'furniture',
//   image: 'www.furniture.com',
// };

// const testProduct: Product = {
//   name: 'chair',
//   price: 50,
//   description: 'This is nice chair',
//   images: ['www.pic1.com'],
//   size: Size.Large,
//   category: testCategory,
// };

// const testOrderItem: OrderItem = {
//   product: testProduct,
//   quantity: 2,
// };

// const testOrder: Order = {
//   user: testUser,
//   items: [testOrderItem],
//   totalPrice: 100,
//   shippingAddress: 'Abc Finland',
//   payment: true,
//   status: OrderStatus.Delivered,
//   createdAt: '2024-0404',
// };

// export async function createOrder(userId: string) {
//   const order = await request(app)
//     .post('/api/v1/orders')
//     .send({ ...testOrder, user: userId });
//   console.log('order', order.body);
// }
