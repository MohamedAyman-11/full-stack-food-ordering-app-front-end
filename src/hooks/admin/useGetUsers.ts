import { getUsers } from '@/api/admin';
import { Query_Keys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useGetUsers = () => {
  return useQuery({
    queryKey: [Query_Keys.ADMIN_USERS],
    queryFn: getUsers,
  });
};
export default useGetUsers;
