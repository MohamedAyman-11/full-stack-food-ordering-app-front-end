import { createExtra } from '@/api/extra';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCreateExtra = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createExtra,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.EXTRAS] });
      toast.success(Messages.EXTRA_CREATED);
    },
  });
};
export default useCreateExtra;
