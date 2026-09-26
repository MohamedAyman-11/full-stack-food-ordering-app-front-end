import type { LoginUserData, RegisterUserData } from '@/interfaces';
import { axiosInstance } from '@/lib/axios';
import type { ForgotPassword, GoogleAuthData, ResetPassword } from '@/types/auth';
import { isAxiosError } from 'axios';

export const register = async (userData: RegisterUserData) => {
  const { data } = await axiosInstance.post('/auth/register', userData);
  return data;
};

export const login = async (userData: LoginUserData) => {
  const { data } = await axiosInstance.post('/auth/login', userData);
  return data.data.user;
};

export const googleAuth = async (googleAuthData: GoogleAuthData) => {
  const { data } = await axiosInstance.post('/auth/google', googleAuthData);
  return data;
};

export const forgotPassword = async (forgotCredentials: ForgotPassword) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', forgotCredentials);
  return data;
};

export const resetPassword = async (resetCredentials: ResetPassword) => {
  const { data } = await axiosInstance.post(`/auth/reset-password/${resetCredentials.token}`, {
    newPassword: resetCredentials.newPassword,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data.data;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get('/auth/me');
    return data.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
