import { useState } from 'react';
import ProductsList from './ProductsList';
import ProductForm from './ProductForm';
import { Button } from '@/components/ui/button';

const index = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  // if (isPending) return <Loading />;
  return (
    <div className="w-full lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Items</h3>
        <Button size={'lg'} className={'cursor-pointer px-6! py-2!'} onClick={() => setShowForm(true)}>
          Add new item
        </Button>
      </div>
      <ProductForm showForm={showForm} setShowForm={setShowForm} />
      <ProductsList />
    </div>
  );
};

export default index;
