import { Button } from '@/components/ui/button';
import SizesForm from './SizesForm';
import { useState } from 'react';
import SizeList from './SIzeList';

const Sizes = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Sizes</h3>
        <Button size={'lg'} className={'cursor-pointer px-6! py-2!'} onClick={() => setShowForm(true)}>
          Add Size
        </Button>
      </div>
      <SizesForm showForm={showForm} setShowForm={setShowForm} />
      <SizeList />
    </div>
  );
};

export default Sizes;
