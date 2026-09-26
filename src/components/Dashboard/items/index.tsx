import ProductsList from './ProductsList';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import { Plus } from 'lucide-react';

const index = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/${Routes.ADMIN}/${Pages.ITEMS}/new`);
  };
  return (
    <div className="w-full lg:pl-6 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Items</h3>
        <Button
          onClick={onClickHandler}
          variant={'default'}
          size={'lg'}
          className={'cursor-pointer px-6! py-2! font-semibold'}
        >
          <Plus className="stroke-3" /> Add new Item
        </Button>
      </div>
      <ProductsList />
    </div>
  );
};

export default index;
