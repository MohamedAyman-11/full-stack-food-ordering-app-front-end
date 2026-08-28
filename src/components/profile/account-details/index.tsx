import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import UserDataForm from './UserDataForm';

const AccountDetails = () => {
  const { data } = useGetCurrentUser();
  return (
    <div className="w-full  lg:pl-8">
      <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Account details</h3>
      <UserDataForm user={data} />
    </div>
  );
};

export default AccountDetails;
