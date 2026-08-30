import { deleteProduct } from '@/api/product';
import { Messages, Query_Keys } from '@/constants';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useDeleteProduct = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success(Messages.PRODUCT_DELETED);
      await Promise.all([
        client.invalidateQueries({ queryKey: [Query_Keys.PRODUCTS] }),
        client.invalidateQueries({ queryKey: [Query_Keys.CATEGORIES_PRODUCTS] }),
      ]);
    },
  });
};

export default useDeleteProduct;
