import { Button } from '@/components/ui/button';
import SizesForm from './SizesForm';
import { useState } from 'react';
import SizeList from './SIzeList';
import { Plus } from 'lucide-react';

const Sizes = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="w-full lg:pl-6 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Sizes</h3>
        <Button
          onClick={() => setShowForm(true)}
          variant={'default'}
          size={'lg'}
          className={'cursor-pointer px-6! py-2! font-semibold'}
        >
          <Plus className="stroke-3" /> Add Size
        </Button>
      </div>
      <SizesForm showForm={showForm} setShowForm={setShowForm} />
      <SizeList setShowForm={setShowForm} />
    </div>
  );
};

export default Sizes;
