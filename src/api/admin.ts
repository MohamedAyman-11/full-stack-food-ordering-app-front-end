import axiosInstance from '@/lib/axios';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/admin/users');
  return data.data.users;
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
