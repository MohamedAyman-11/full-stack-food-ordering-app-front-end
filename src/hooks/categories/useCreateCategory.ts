import { createCategory } from '@/api/category';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCreateCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES],
        }),
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORIES_PRODUCTS],
        }),
        client.invalidateQueries({
          queryKey: [Query_Keys.CATEGORY],
        }),
      ]);
      toast.success(Messages.CATEGORY_CREATED);
    },
  });
};

export default useCreateCategory;
