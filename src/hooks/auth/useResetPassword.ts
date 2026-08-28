import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
export default useResetPassword;
