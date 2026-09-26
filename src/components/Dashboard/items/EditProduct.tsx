import { buttonVariants } from '@/components/ui/button';
import { Pages, Routes } from '@/constants';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Props {
  id: string;
}
const EditProduct = ({ id }: Props) => {
  return (
    <Link
      to={`/${Routes.ADMIN}/${Pages.ITEMS}/${id}`}
      className={`${buttonVariants({ variant: 'default' })} h-10! rounded-xl! bg-secondary! text-black! 
      flex! items-center! justify-center! gap-2 border border-border! hover:bg-gray-200! font-medium`}
    >
      <Pencil className="size-4" />
      Edit
    </Link>
  );
};

export default EditProduct;
