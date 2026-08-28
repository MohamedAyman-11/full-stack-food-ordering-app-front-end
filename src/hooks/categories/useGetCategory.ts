import { getCategory } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = (id: string) => {
  return useQuery({
    queryFn: () => getCategory(id),
    queryKey: [Query_Keys.CATEGORY, id],
    enabled: !!id,
  });
};

export default useGetCategory;
