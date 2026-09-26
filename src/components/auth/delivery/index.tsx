import AuthHero from '../AuthHero';
import DeliveryLoginForm from './DeliveryLoginForm';
const index = () => {
  return (
    <div className="flex items-center">
      <AuthHero
        heading="Ready to hit the road?"
        description="Sign in to manage your deliveries and stay on top of every order."
      />
      <div className="w-full lg:w-1/2">
        <DeliveryLoginForm />
      </div>
    </div>
  );
};

export default index;
