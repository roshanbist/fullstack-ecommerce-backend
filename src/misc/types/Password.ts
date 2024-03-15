export type PasswordReset = {
  userEmail: string;
}

export type PasswordUpdte = {
  userName: string;
  oldPassword: string;
  newPassword: string;
}