import { signup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
export default useSignup;
