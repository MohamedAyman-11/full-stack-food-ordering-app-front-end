import { googleAuth } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGoogleAuth = () => {
  return useMutation({
    mutationFn: googleAuth,
  });
};

export default useGoogleAuth;
