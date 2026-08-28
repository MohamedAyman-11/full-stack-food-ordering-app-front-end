import { updateCategory } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useUpdateCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES],
        }),
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES_PRODUCTS],
        }),
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORY],
        }),
      ]);
    },
  });
};

export default useUpdateCategory;
