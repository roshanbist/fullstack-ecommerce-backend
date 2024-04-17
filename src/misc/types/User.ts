export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
}

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
  avatar: string;
  address: string;
  active: boolean;
};

export type UserActiveAndRole = {
  role: UserRole;
  active: boolean;
};
