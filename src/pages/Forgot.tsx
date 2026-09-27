import ForgotPasswordComponent from '@/components/auth/forgotPassword/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Forgot = () => {
  return (
    <>
      <SEO title={seo.forgotPassword.title} description={seo.forgotPassword.description} />
      <ForgotPasswordComponent />
    </>
  );
};

export default Forgot;
