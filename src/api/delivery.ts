import type { LoginUserData } from '@/interfaces';
import { axiosInstance } from '@/lib/axios';
import { isAxiosError } from 'axios';

export const login = async (userData: LoginUserData) => {
  const { data } = await axiosInstance.post('/delivery/login', userData);
  return data.data.deliveryBoy;
};

export const getCurrentDelivery = async () => {
  try {
    const { data } = await axiosInstance.get('/delivery/me');
    return data.data.deliveryBoy;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const logout = async () => {
  const { data } = await axiosInstance.post('/delivery/logout');
  return data.data;
};

type OrdersStatus = 'active' | 'completed';
export const getMyOrders = async (status: OrdersStatus) => {
  const params = { status };
  const { data } = await axiosInstance.get('/delivery/orders', { params });
  return data.data.orders;
};

type UpdateOrderStatus = {
  orderId: string;
  newStatus: 'PACKED' | 'OUT_FOR_DELIVERY';
};

export const updateOrderStatus = async ({ orderId, newStatus }: UpdateOrderStatus) => {
  await axiosInstance.patch(`delivery/orders/${orderId}/status`, { newStatus });
};

type CompleteOrder = {
  orderId: string;
  deliveryOtp: string;
};

export const completeOrder = async ({ orderId, deliveryOtp }: CompleteOrder) => {
  await axiosInstance.patch(`delivery/orders/${orderId}/complete`, { deliveryOtp });
};

type CancelOrder = {
  orderId: string;
};

export const cancelOrder = async ({ orderId }: CancelOrder) => {
  await axiosInstance.patch(`delivery/orders/${orderId}/cancel`);
};
