import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

import useGoogleAuth from "@/hooks/auth/useGoogleAuth";
import toast from "../../../node_modules/react-hot-toast/src/index";
import { Messages } from "@/constants";
import { axiosErrorHandler } from "@/lib/functions";

const GoogleLoginButton = () => {
  const { mutateAsync } = useGoogleAuth();
  const onLogin = async (response: CredentialResponse) => {
    try {
      await mutateAsync({
        credential: response.credential!,
        remember: true,
      });

      toast.success(Messages.LOGIN_SUCCESSFULLY);
      location.reload();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <GoogleLogin
      text="continue_with"
      onSuccess={onLogin}
      onError={() => {
        toast.error("Google login failed");
      }}
    />
  );
};

export default GoogleLoginButton;
