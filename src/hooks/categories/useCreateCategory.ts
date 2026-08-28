import { createCategory } from "@/api/category";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
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

export default useCreateCategory;
