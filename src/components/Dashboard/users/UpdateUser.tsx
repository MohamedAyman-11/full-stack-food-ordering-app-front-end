import { buttonVariants } from '@/components/ui/button';
import { Pages, Routes } from '@/constants';
import { Pen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}
const UpdateUser = ({ id }: Props) => {
  return (
    <Link
      to={`/${Routes.ADMIN}/${Pages.CUSTOMERS}/${id}`}
      className={`${buttonVariants({ variant: 'secondary' })} cursor-pointer!`}
    >
      <Pen />
    </Link>
  );
};

export default UpdateUser;
