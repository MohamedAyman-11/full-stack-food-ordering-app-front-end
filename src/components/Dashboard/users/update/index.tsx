import useGetUser from '@/hooks/admin/useGetUser';
import UpdateUserForm from './UpdateUserForm';
import { useParams } from 'react-router-dom';
import Loading from '../../extras/Loading';

const index = () => {
  const params = useParams();
  const { isPending, data } = useGetUser(params.id || '');
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Update User</h3>
      </div>
      {isPending ? <Loading /> : <UpdateUserForm user={data} />}
    </div>
  );
};

export default index;
