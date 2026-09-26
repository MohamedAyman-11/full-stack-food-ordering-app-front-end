export type GoogleAuthData = {
  credential: string;
  remember: boolean;
};

export type ForgotPassword = {
  email: string;
};
export type ResetPassword = {
  newPassword: string;
  token: string;
};
