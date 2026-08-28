import { deleteUser } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_USERS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_USER] }),
      ]);
    },
  });
};
export default useDeleteUser;
