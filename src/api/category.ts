import axiosInstance from '@/lib/axios';

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get('/categories');
  return data.data.categories;
};
export const getCategory = async (id: string) => {
  const { data } = await axiosInstance.get(`/categories/${id}`);
  return data.data.category;
};
export const getAllCategoriesWithProducts = async () => {
  const { data } = await axiosInstance.get('/categories/with-products');
  return data.data;
};

export const createCategory = async (data: FormData) => {
  const res = await axiosInstance.post('/categories', data);
  return res.data.data;
};
type UpdateCategory = {
  data: FormData;
  id: string;
};
export const updateCategory = async ({ data, id }: UpdateCategory) => {
  const res = await axiosInstance.patch(`/categories/${id}`, data);
  return res.data.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};

export const getCategoryOptions = async (id: string) => {
  const res = await axiosInstance.get(`/categories/${id}/options`);
  return res.data.data;
};
