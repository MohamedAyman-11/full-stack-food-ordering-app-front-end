import { getAllCategoriesWithProducts } from '@/api/category';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
type Params = {
  category: string;
};
const useGetCategoriesWithProducts = ({ category }: Params) => {
  return useQuery({
    queryKey: [Query_Keys.CATEGORIES_PRODUCTS, category],
    queryFn: () => getAllCategoriesWithProducts({ category }),
  });
};
export default useGetCategoriesWithProducts;
