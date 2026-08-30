import axiosInstance from '@/lib/axios';

export const getProduct = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.data.product;
};
export const getProducts = async () => {
  const { data } = await axiosInstance.get(`/products`);
  return data.data.products;
};

export const createProduct = async (data: FormData) => {
  await axiosInstance.post(`/products`, data);
};

export const deleteProduct = async (id: string) => {
  await axiosInstance.delete(`/products/${id}`);
};
