import ProductsList from './ProductsList';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Pages, Routes } from '@/constants';

const index = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/${Routes.ADMIN}/${Pages.ITEMS}/new`);
  };
  return (
    <div className="w-full lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Items</h3>
        <Button size={'lg'} className={'cursor-pointer px-6! py-2!'} onClick={onClickHandler}>
          Add new item
        </Button>
      </div>
      <ProductsList />
    </div>
  );
};

export default index;
