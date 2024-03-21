export enum UserRole {
  Customer = 'customer',
  Admin = 'admin'
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  role: UserRole;
  avatar: string
};