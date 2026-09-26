import { axiosInstance } from '@/lib/axios';
import type { DeliveryRegisterSchemaType } from '@/validation';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/admin/users');
  return data.data.users;
};

type Params = {
  page: number;
};

export const getProducts = async ({ page }: Params) => {
  const { data } = await axiosInstance.get('/admin/products', { params: { page } });
  return data.data;
};

export const getUser = async (id: string) => {
  const { data } = await axiosInstance.get(`/admin/users/${id}`);
  return data.data.user;
};

export const deleteUser = async (id: string) => {
  await axiosInstance.delete(`/admin/users/${id}`);
};

type UpdateUser = {
  data: FormData;
  id: string;
};

export const updateUser = async ({ data, id }: UpdateUser) => {
  await axiosInstance.patch(`/admin/users/${id}`, data);
};

export const getDeliveryPartners = async () => {
  const { data } = await axiosInstance.get('/admin/delivery-partners');
  return data.data.deliveryPartners;
};

export const getActiveDeliveryPartners = async () => {
  const { data } = await axiosInstance.get('/admin/active-delivery-partners');
  return data.data.deliveryPartners;
};

export const registerDeliveryPartner = async (userData: DeliveryRegisterSchemaType) => {
  await axiosInstance.post('/delivery/register', userData);
};

type ChangeDeliveryPartnerStatus = {
  id: string;
  newStatus: 'ACTIVE' | 'INACTIVE';
};

export const changeDeliveryPartnerStatus = async ({ id, newStatus }: ChangeDeliveryPartnerStatus) => {
  await axiosInstance.patch(`/admin/delivery-partners/${id}/status`, { newStatus });
};

type GetOrdersParams = {
  page: number;
};

export const getAdminOrders = async ({ page }: GetOrdersParams) => {
  const { data } = await axiosInstance.get('/admin/orders', { params: { page } });
  return data.data;
};

type AssignDeliveryToOrder = {
  deliveryBoyId: string;
  orderId: string;
};

export const assignDeliveryBoyToOrder = async ({ deliveryBoyId, orderId }: AssignDeliveryToOrder) => {
  await axiosInstance.patch(`/admin/orders/${orderId}/assign-delivery-boy`, { deliveryBoyId });
};
