import { updateProduct } from '@/api/product';
import { Messages, Query_Keys } from '@/constants';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateProduct = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      toast.success(Messages.PRODUCT_UPDATED);
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.PRODUCTS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.PRODUCT] }),
        client.invalidateQueries({ queryKey: [Query_Keys.CATEGORIES_PRODUCTS] }),
      ]);
    },
  });
};

export default useUpdateProduct;
