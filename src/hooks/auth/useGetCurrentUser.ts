import { getCurrentUser } from "@/api/auth";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [Query_Keys.CURRENT_USER],
    queryFn: getCurrentUser,
    throwOnError: false,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });
};
export default useGetCurrentUser;
