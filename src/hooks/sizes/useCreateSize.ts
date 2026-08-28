import { createSize } from "@/api/size";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSize = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createSize,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.SIZES] });
    },
  });
};
export default useCreateSize;
