import { updateProfile } from "@/api/user";
import { Query_Keys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_USER] });
    },
  });
};

export default useUpdateProfile;
