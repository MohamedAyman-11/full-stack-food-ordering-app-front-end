import { getProducts } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

type Params = {
  page: number;
};
const useGetProducts = ({ page }: Params) => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_PRODUCTS, page],
    queryFn: () => getProducts({ page }),
  });
};

export default useGetProducts;
