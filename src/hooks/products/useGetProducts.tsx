import { getProducts } from '@/api/product';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

type ProductParams = {
  categories?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

const useGetProducts = ({ categories, search, minPrice, maxPrice, sort, page }: ProductParams) => {
  return useQuery({
    queryKey: [Query_Keys.PRODUCTS, categories, search, minPrice, maxPrice, sort, page],
    queryFn: () => getProducts({ categories, search, minPrice, maxPrice, sort, page }),
  });
};

export default useGetProducts;
