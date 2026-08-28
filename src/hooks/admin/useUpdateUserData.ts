import { updateUser } from '@/api/admin';
import { Messages, Query_Keys } from '@/constants';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateUserData = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      toast.success(Messages.ADMIN_USER_UPDATED);
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_USER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_USER] }),
        client.invalidateQueries({ queryKey: [Query_Keys.ADMIN_USERS] }),
      ]);
    },
  });
};

export default useUpdateUserData;
