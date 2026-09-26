import AuthHero from '../AuthHero';
import LoginForm from './LoginForm';
const Index = () => {
  return (
    <div className="flex items-center">
      <AuthHero
        heading="Welcome back to Craveo"
        description="Sign in to your account and get back to enjoying your favorite meals."
      />
      <div className="w-full lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
