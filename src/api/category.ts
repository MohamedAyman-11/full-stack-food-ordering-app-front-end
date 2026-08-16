import instance from "@/lib/axios";

export const getAllCategories = async () => {
  const { data } = await instance.get("/categories");
  return data.data;
};
export const getAllCategoriesWithProducts = async () => {
  const { data } = await instance.get("/categories/with-products");
  return data.data;
};
