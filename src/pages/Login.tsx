import LoginComponent from '@/components/auth/Login/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Login = () => {
  return (
    <>
      <SEO title={seo.login.title} description={seo.login.description} />
      <div>
        <LoginComponent />
      </div>
    </>
  );
};

export default Login;
