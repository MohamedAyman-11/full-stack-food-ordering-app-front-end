import { buttonVariants } from '@/components/ui/button';
import { Pages, Routes } from '@/constants';
import { Pen, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Props {
  id: string;
}
const EditProduct = ({ id }: Props) => {
  return (
    <Link
      to={`/${Routes.ADMIN}/${Pages.ITEMS}/${id}`}
      className={`${buttonVariants({ size: 'lg' })} inline-flex! items-center! justify-center! gap-2 rounded-md border
      bg-slate-200! transition-all duration-300
       border-gray-200! px-3 py-2 text-sm font-medium text-gray-600!  hover:bg-slate-300! hover:text-gray-900!`}
    >
      <Pencil className="h-4 w-4" />
      Edit
    </Link>
  );
};

export default EditProduct;
