import { getCategoryOptions } from '@/api/category';
import { useQuery } from '@tanstack/react-query';
import { Query_Keys } from '@/constants';

const useGetCategoryOptions = (id: string) => {
  return useQuery({
    queryFn: () => getCategoryOptions(id),
    queryKey: [Query_Keys.CATEGORY_OPTIONS, id],
    enabled: !!id,
  });
};

export default useGetCategoryOptions;
