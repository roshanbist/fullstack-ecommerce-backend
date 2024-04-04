export enum UserRole {
  Customer = 'customer',
  Admin = 'admin'
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  role: UserRole;
  avatar: string;
  address: string;
  active: boolean;
};

export type UserActiveAndRole = {
  role: UserRole,
  active: boolean
}