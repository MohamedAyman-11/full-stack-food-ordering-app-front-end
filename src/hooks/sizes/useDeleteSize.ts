import { deleteSize } from "@/api/size";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSize = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteSize,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.SIZES] });
    },
  });
};
