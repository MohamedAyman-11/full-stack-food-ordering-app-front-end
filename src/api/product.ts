import axiosInstance from "@/lib/axios";

export const getProduct = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.data.product;
};
