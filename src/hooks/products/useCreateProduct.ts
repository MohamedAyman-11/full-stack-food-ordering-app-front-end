import { createProduct } from '@/api/product';
import { Messages, Query_Keys } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCreateProduct = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      toast.success(Messages.PRODUCT_CREATED);
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.PRODUCTS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.CATEGORIES_PRODUCTS] }),
      ]);
    },
  });
};

export default useCreateProduct;
