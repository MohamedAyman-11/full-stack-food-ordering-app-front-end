import { getProducts } from '@/api/product';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetProducts = () => {
  return useQuery({
    queryKey: [Query_Keys.PRODUCTS],
    queryFn: getProducts,
  });
};

export default useGetProducts;
