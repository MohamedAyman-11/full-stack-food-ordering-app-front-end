import LoadingButton from '@/components/ui/LoadingButton';
import { useSearchParams } from 'react-router-dom';

interface Props {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  isLoading: boolean;
  setOpen?: (val: boolean) => void;
  setOption: (val: string) => void;
}
const ApplyFilter = ({ categories, minPrice, maxPrice, isLoading, setOpen, setOption }: Props) => {
  const [_, setSearchParams] = useSearchParams();

  const onClickHandler = () => {
    setSearchParams((prev) => {
      prev.set('category', categories.join(', '));
      prev.set('minPrice', minPrice.toString());
      prev.set('maxPrice', maxPrice.toString());
      prev.set('page', '1');
      prev.set('sort', 'recent_desc');
      return prev;
    });
    setOption('recent_desc');
    setOpen && setOpen(false);
  };

  return (
    <div className="py-2">
      <LoadingButton
        isPending={isLoading}
        disabled={isLoading}
        onClick={onClickHandler}
        className={'cursor-pointer w-full h-10 font-semibold'}
      >
        Apply Filters
      </LoadingButton>
    </div>
  );
};

export default ApplyFilter;
