import { getSizes } from "@/api/size";
import { Query_Keys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useGetSizes = () => {
  return useQuery({
    queryKey: [Query_Keys.SIZES],
    queryFn: getSizes,
  });
};
export default useGetSizes;
