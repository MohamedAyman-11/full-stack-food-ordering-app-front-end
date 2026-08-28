import { deleteExtra } from "@/api/extra";
import { Query_Keys } from "@/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useDeleteExtra = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteExtra,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.EXTRAS] });
    },
  });
};

export default useDeleteExtra;
