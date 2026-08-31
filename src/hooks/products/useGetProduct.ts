import { getProduct } from '@/api/product';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export const useGetProduct = ({ id, open }: { id: string; open: boolean }) => {
  return useQuery({
    queryKey: [Query_Keys.PRODUCT, id],
    queryFn: () => getProduct(id),
    enabled: open,
  });
};

export const useGetProductUpdate = (id: string) => {
  return useQuery({
    queryKey: [Query_Keys.PRODUCT, id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};
