import axiosInstance from "@/lib/axios";

export const getSizes = async () => {
  const { data } = await axiosInstance.get("/sizes");
  return data.data.sizes;
};

export const createSize = async (data: { name: string }) => {
  const res = await axiosInstance.post("/sizes", data);
  return res.data;
};

type UpdateSize = {
  name: string;
  sizeId: string;
};

export const updateSize = async ({ name, sizeId }: UpdateSize) => {
  const res = await axiosInstance.patch(`/sizes/${sizeId}`, { name });
  return res.data;
};

export const deleteSize = async (id: string) => {
  const res = await axiosInstance.delete(`/sizes/${id}`);
  return res.data;
};
