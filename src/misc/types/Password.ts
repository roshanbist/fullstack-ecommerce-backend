export type PasswordReset = {
  userEmail: string;
};

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};
