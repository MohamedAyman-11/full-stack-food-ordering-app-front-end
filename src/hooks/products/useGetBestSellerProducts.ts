import { getBestSellerProducts } from '@/api/product';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetBestSellerProducts = () => {
  return useQuery({
    queryKey: [Query_Keys.BEST_SELLER],
    queryFn: getBestSellerProducts,
  });
};

export default useGetBestSellerProducts;
