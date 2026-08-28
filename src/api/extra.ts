import axiosInstance from "@/lib/axios";

export const getExtras = async () => {
  const { data } = await axiosInstance.get("/extras");
  return data.data.extras;
};
export const createExtra = async (data: { name: string }) => {
  const res = await axiosInstance.post("/extras", data);
  return res.data;
};
type UpdateExtra = {
  name: string;
  extraId: string;
};
export const updateExtra = async ({ name, extraId }: UpdateExtra) => {
  const res = await axiosInstance.patch(`/extras/${extraId}`, { name });
  return res.data;
};

export const deleteExtra = async (id: string) => {
  const res = await axiosInstance.delete(`/extras/${id}`);
  return res.data;
};
