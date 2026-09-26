import { updateExtra } from '@/api/extra';
import { Messages, Query_Keys } from '@/constants';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateExtra = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateExtra,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.EXTRAS] });
      toast.success(Messages.EXTRA_UPDATED);
    },
  });
};
export default useUpdateExtra;
