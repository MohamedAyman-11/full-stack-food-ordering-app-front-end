import { createExtra } from "@/api/extra";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateExtra = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createExtra,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.EXTRAS] });
    },
  });
};
export default useCreateExtra;
