import { forgotPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
export default useForgotPassword;
