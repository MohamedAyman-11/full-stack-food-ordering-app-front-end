import { useState } from 'react';
import CategoryForm from './CategoryForm';
import { Button } from '@/components/ui/button';
import useGetCategories from '@/hooks/categories/useGetCategories';
import CategoriesList from './CategoriesList';
import Loading from '../Loading';
import { Plus } from 'lucide-react';

const index = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data, isPending } = useGetCategories();
  if (isPending)
    return (
      <div className="flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  const showFormHandler = () => setShowForm(true);
  return (
    <div className="w-full lg:pl-8 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Categories</h3>
        <Button
          onClick={showFormHandler}
          variant={'default'}
          size={'lg'}
          className={'cursor-pointer px-6! py-2! font-semibold'}
        >
          <Plus className="stroke-3" /> Add Category
        </Button>
      </div>
      <CategoryForm setShowForm={setShowForm} showForm={showForm} />
      <CategoriesList setShowForm={setShowForm} categories={data} />
    </div>
  );
};

export default index;
