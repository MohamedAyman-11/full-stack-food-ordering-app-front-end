import { deleteCategory } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES],
        }),
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES_PRODUCTS],
        }),
      ]);
    },
  });
};

export default useDeleteCategory;
