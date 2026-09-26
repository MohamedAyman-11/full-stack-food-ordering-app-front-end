import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ExtrasForm from './ExtrasForm';
import ExtrasList from './ExtrasList';
import { Plus } from 'lucide-react';

const Extras = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="w-full lg:pl-6 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Extras</h3>
        <Button
          onClick={() => setShowForm(true)}
          variant={'default'}
          size={'lg'}
          className={'cursor-pointer px-6! py-2! font-semibold'}
        >
          <Plus className="stroke-3" /> Add Extra
        </Button>
      </div>
      <ExtrasForm showForm={showForm} setShowForm={setShowForm} />
      <ExtrasList setShowForm={setShowForm} />
    </div>
  );
};

export default Extras;
