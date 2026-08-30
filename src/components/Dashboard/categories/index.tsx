import { useState } from 'react';
import CategoryForm from './CategoryForm';
import { Button } from '@/components/ui/button';
import useGetCategories from '@/hooks/categories/useGetCategories';
import CategoriesList from './CategoriesList';
import Loading from '../extras/Loading';

const index = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data, isPending } = useGetCategories();
  if (isPending) return <Loading />;
  return (
    <div className="w-full lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Categories</h3>
        <Button size={'lg'} className={'cursor-pointer px-6! py-2!'} onClick={() => setShowForm(true)}>
          Add category
        </Button>
      </div>
      <CategoryForm setShowForm={setShowForm} showForm={showForm} />
      <CategoriesList categories={data} />
    </div>
  );
};

export default index;
