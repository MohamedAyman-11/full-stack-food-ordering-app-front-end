import { getAllCategoriesWithProducts } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useGetCategoriesWithProducts = () => {
  return useQuery({
    queryKey: [Query_Keys.CATEGORIES_PRODUCTS],
    queryFn: getAllCategoriesWithProducts,
  });
};
export default useGetCategoriesWithProducts;
