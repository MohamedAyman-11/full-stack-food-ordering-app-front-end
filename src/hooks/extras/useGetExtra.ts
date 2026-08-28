import { getExtras } from "@/api/extra";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useGetExtras = () => {
  return useQuery({
    queryKey: [Query_Keys.EXTRAS],
    queryFn: getExtras,
  });
};
export default useGetExtras;
