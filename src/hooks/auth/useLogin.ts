import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    retry: false,
  });
};

export default useLogin;
