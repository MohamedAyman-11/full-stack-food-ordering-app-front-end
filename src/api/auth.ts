import type { LoginUserData, SignupUserData } from "@/interfaces";
import axiosInstance from "@/lib/axios";
type GoogleAuthData = {
  credential: string;
  remember: boolean;
};
type ForgotPassword = {
  email: string;
};
type ResetPassword = {
  newPassword: string;
  token: string;
};
export const login = async (userData: LoginUserData) => {
  const { data } = await axiosInstance.post("/auth/login", userData);
  return data;
};
export const signup = async (userData: SignupUserData) => {
  const { data } = await axiosInstance.post("/auth/signup", userData);
  return data;
};
export const googleAuth = async (googleAuthData: GoogleAuthData) => {
  const { data } = await axiosInstance.post("/auth/google", googleAuthData);
  return data;
};
export const forgotPassword = async (forgotCredentials: ForgotPassword) => {
  const { data } = await axiosInstance.post(
    "/auth/forgot-password",
    forgotCredentials,
  );
  return data;
};
export const resetPassword = async (resetCredentials: ResetPassword) => {
  const { data } = await axiosInstance.post(
    `/auth/reset-password/${resetCredentials.token}`,
    { newPassword: resetCredentials.newPassword },
  );
  return data;
};
export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data.data;
};
export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data.data.user;
};
