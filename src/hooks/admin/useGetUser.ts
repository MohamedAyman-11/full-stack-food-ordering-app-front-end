import { getUser } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetUser = (id: string) => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_USER, id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export default useGetUser;
