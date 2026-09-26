import type { Category } from '@/interfaces';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';
import EmptyState from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import type { Dispatch, SetStateAction } from 'react';
import { Info } from 'lucide-react';

interface Props {
  categories: Category[];
  setShowForm: Dispatch<SetStateAction<boolean>>;
}
const CategoriesList = ({ categories, setShowForm }: Props) => {
  return categories.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 my-10">
      {categories.map((cat) => (
        <div key={cat.id} className="group bg-gray-200 p-3 rounded-md relative">
          <img src={cat.image.url} alt={cat.name} className="w-60 h-60 mx-auto object-contain" />
          <div
            className="z-40 rounded-md transition-all duration-300 flex items-center
               bg-gray-100/50 justify-center
             w-full h-full absolute inset-1/2 transform -translate-1/2 gap-5 opacity-0 group-hover:opacity-100"
          >
            <EditCategory id={cat.id} />
            <DeleteCategory id={cat.id} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <EmptyState
      title="No Categories found!"
      description="Create your first category to organize your items and keep everything easy to manage."
      icon={<Info className="size-6" />}
      action={
        <Button onClick={() => setShowForm(true)} variant={'default'} size={'lg'} className={'w-40 py-2 font-semibold'}>
          <Link to={`/${Routes.ADMIN}/${Pages.CATEGORIES}`}>Create category</Link>
        </Button>
      }
      className="mt-10"
    />
  );
};

export default CategoriesList;
