import { updateSize } from "@/api/size";
import { Query_Keys } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUpdateSize = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateSize,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.SIZES] });
    },
  });
};

export default useUpdateSize;
