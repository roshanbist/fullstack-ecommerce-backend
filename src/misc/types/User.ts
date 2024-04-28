export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
}

export type UserActiveAndRole = {
  role: UserRole;
  active: boolean;
};

export type UserAuth = {
  email: string;
  password: string;
};

export type User = UserActiveAndRole &
  UserAuth & {
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
    address: string;
  };
