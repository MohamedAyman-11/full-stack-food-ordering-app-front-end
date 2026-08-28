import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ExtrasForm from './ExtrasForm';
import ExtrasList from './ExtrasList';

const Extras = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Extras</h3>
        <Button size={'lg'} className={'cursor-pointer px-6! py-2!'} onClick={() => setShowForm(true)}>
          Add extra
        </Button>
      </div>
      <ExtrasForm showForm={showForm} setShowForm={setShowForm} />
      <ExtrasList />
    </div>
  );
};

export default Extras;
