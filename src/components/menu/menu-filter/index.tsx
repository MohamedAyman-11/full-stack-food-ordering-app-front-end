import { Accordion } from '@/components/ui/accordion';
import Categories from './Categories';
import MenuFilterHeader from './MenuFilterHeader';
import PriceRange from './PriceRange';
import ApplyFilter from './ApplyFilter';
import { Separator } from '@base-ui/react';
import { useSearchParams } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
interface Props {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  prices: number[];
  setPrices: Dispatch<SetStateAction<number[]>>;
  isLoading: boolean;
  setOption: (val: string) => void;
}
const MenuFilter = ({ isLoading, selectedCategories, setSelectedCategories, setPrices, prices, setOption }: Props) => {
  const [_, setSearchParams] = useSearchParams();

  const onResetHandler = () => {
    setSelectedCategories(['all']);
    setPrices([0, 20]);
    setSearchParams({});
  };

  return (
    <div className="w-65 shrink-0 bg-white p-5 rounded-lg shadow-md h-fit hidden lg:block ">
      <MenuFilterHeader onResetHandler={onResetHandler} />
      <Accordion defaultValue={['categories', 'price']} multiple={true} className="max-w-lg">
        <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        <PriceRange prices={prices} setPrices={setPrices} />
      </Accordion>
      <Separator className={'h-px bg-border'} />
      <ApplyFilter
        setOption={setOption}
        categories={selectedCategories}
        minPrice={prices[0]}
        maxPrice={prices[1]}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MenuFilter;
