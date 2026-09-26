import { googleAuth } from '@/api/auth';
import { Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useGoogleAuth = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: googleAuth,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.CURRENT_USER] });
      toast.success(`Welcome! You're all set.`);
    },
  });
};

export default useGoogleAuth;
