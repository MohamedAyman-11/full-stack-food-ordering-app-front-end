import RegisterComponent from '@/components/auth/register/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Register = () => {
  return (
    <div>
      <SEO title={seo.register.title} description={seo.register.description} />
      <RegisterComponent />
    </div>
  );
};

export default Register;
