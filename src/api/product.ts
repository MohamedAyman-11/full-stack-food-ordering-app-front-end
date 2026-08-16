import instance from "@/lib/axios";

export const getProduct = async (id: string) => {
  const { data } = await instance.get(`/products/${id}`);
  return data.data.product;
};
