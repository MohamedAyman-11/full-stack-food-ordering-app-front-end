import ResetPasswordForm from './ResetPasswordForm';
import AuthHero from '../AuthHero';

const index = () => {
  return (
    <div className="flex items-center">
      <AuthHero
        heading="Create a new password"
        description="Choose a new password to keep your Craveo account secure and get back to ordering."
      />
      <div className="w-full lg:w-1/2">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default index;
