import { updateSize } from '@/api/size';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateSize = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateSize,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [Query_Keys.SIZES] });
      toast.success(Messages.SIZE_UPDATED);
    },
  });
};

export default useUpdateSize;
