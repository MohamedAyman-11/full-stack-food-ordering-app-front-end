import instance from "@/lib/axios";

export const getAllCategories = async () => {
  const { data } = await instance.get("/categories");
  return data.data;
};
