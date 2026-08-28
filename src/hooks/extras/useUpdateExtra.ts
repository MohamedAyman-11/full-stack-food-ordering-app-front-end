import { updateExtra } from "@/api/extra";
import { Query_Keys } from "@/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useUpdateExtra = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateExtra,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.EXTRAS] });
    },
  });
};
export default useUpdateExtra;
