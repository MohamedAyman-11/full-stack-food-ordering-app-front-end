import RegisterForm from './RegisterForm';
import AuthHero from '../AuthHero';

const index = () => {
  return (
    <div className="flex items-center">
      <AuthHero
        heading="Join Craveo today"
        description="Create your account and discover delicious meals delivered right to your doorstep."
      />
      <div className="w-full lg:w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default index;
