import { axiosInstance } from '@/lib/axios';
import type { OrderStatus } from '@/types';

type OrderProduct = {
  productId: string;
  sizeId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  extras: {
    id: string;
    price: number;
  }[];
};
type OrderData = {
  paymentMethod: 'credit' | 'on_delivery';
  products: OrderProduct[];
  street: string;
  postalCode: string;
  city: string;
  country: string;
  customerPhone: string;
};

export const createOrder = async (orderData: OrderData) => {
  const { data } = await axiosInstance.post('/orders', orderData);
  return data.data;
};

type GetMyOrdersParams = {
  status: OrderStatus;
  page: number;
};

export const getMyOrders = async ({ status, page }: GetMyOrdersParams) => {
  const params = {
    ...(status !== 'ALL' && { status: status.toLowerCase() }),
    page,
  };
  const { data } = await axiosInstance.get('/orders', { params });
  return data.data;
};

export const getOrder = async (orderId: string) => {
  const { data } = await axiosInstance.get(`/orders/${orderId}`);
  return data.data.order;
};

type CheckoutSuccess = {
  sessionId: string;
};

export const getCheckoutSuccess = async ({ sessionId }: CheckoutSuccess) => {
  const params = { session_id: sessionId };
  const { data } = await axiosInstance.get(`/orders/checkout-success`, { params });

  return data.data;
};

type CheckoutSession = {
  orderId: string;
};

export const createCheckoutSession = async ({ orderId }: CheckoutSession) => {
  const { data } = await axiosInstance.post(`/orders/${orderId}/checkout`);
  return data;
};
