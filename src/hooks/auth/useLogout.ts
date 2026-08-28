import { logout } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
export default useLogout;
