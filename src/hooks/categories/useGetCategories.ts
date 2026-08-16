import { getAllCategories } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => {
  return useQuery({
    queryKey: [Query_Keys.CATEGORIES],
    queryFn: getAllCategories,
  });
};
export default useGetCategories;
