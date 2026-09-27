import ResetPasswordComponent from '@/components/auth/resetPassword/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Reset = () => {
  return (
    <>
      <SEO title={seo.resetPassword.title} description={seo.resetPassword.description} />
      <ResetPasswordComponent />
    </>
  );
};

export default Reset;
