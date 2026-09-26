import ForgotPasswordForm from './ForgotPasswordForm';
import AuthHero from '../AuthHero';

const index = () => {
  return (
    <div className="flex items-center">
      <AuthHero
        heading="Let’s get you back in"
        description="Forgot your password? No worries. We’ll help you reset it and get back to your favorite meals."
      />
      <div className="w-full lg:w-1/2">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default index;
