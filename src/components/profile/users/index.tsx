import useGetUsers from '@/hooks/admin/useGetUsers';
import CustomersList from './CustomersList';

const index = () => {
  return (
    <div className="w-full  lg:pl-8">
      <div className="mb-5">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Customers</h3>
      </div>
      <CustomersList />
    </div>
  );
};

export default index;
