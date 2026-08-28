import { changePassword } from "@/api/user";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangePassword = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_USER] });
    },
  });
};

export default useChangePassword;
