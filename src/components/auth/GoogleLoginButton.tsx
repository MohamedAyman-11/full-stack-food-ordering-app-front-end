import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';

import useGoogleAuth from '@/hooks/auth/useGoogleAuth';
import { axiosErrorHandler } from '@/lib/functions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/constants';

const GoogleLoginButton = () => {
  const { mutateAsync } = useGoogleAuth();
  const navigate = useNavigate();

  const onLogin = async (response: CredentialResponse) => {
    try {
      await mutateAsync({
        credential: response.credential!,
        remember: true,
      });

      navigate(Routes.ROOT, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return (
    <GoogleLogin
      text="continue_with"
      onSuccess={onLogin}
      onError={() => {
        toast.error('Google login failed');
      }}
    />
  );
};

export default GoogleLoginButton;
