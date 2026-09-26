import { useState } from 'react';
import { ListFilter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion } from '@/components/ui/accordion';

import ApplyFilter from '../ApplyFilter';
import Categories from '../Categories';
import PriceRange from '../PriceRange';
import { useSearchParams } from 'react-router-dom';

interface Props {
  isLoading: boolean;
  setOption: (val: string) => void;
}

const FilterButton = ({ isLoading, setOption }: Props) => {
  const [_, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [open, setOpen] = useState(false);
  const onResetHandler = () => {
    setSelectedCategories(['all']);
    setPriceRange([0, 20]);
    setSearchParams((prev) => {
      prev.delete('category');
      prev.delete('minPrice');
      prev.delete('maxPrice');
      return prev;
    });
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <SheetTrigger
        render={
          <Button className="flex-1 cursor-pointer border border-border bg-secondary py-5! text-black shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-slate-200!">
            <ListFilter className="h-5 w-5 text-primary" />
            <span className="text-[16px] font-bold">Filter</span>
          </Button>
        }
      />

      {/* Filter Sheet */}
      <SheetContent
        side="bottom"
        className=" max-h-[70vh] rounded-t-2xl border-none p-0 [&>button]:cursor-pointer gap-1!"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-lg font-bold">Filters</SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="overflow-y-auto px-5 ">
          <Accordion defaultValue={['categories', 'price']} multiple className="w-full">
            <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

            <PriceRange prices={priceRange} setPrices={setPriceRange} />
          </Accordion>
        </div>

        {/* Footer */}
        <SheetFooter className="border-t bg-background px-5 gap-1!">
          <ApplyFilter
            setOption={setOption}
            setOpen={setOpen}
            categories={selectedCategories}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            isLoading={isLoading}
          />

          <Button
            onClick={onResetHandler}
            variant="ghost"
            className="cursor-pointer text-sm font-semibold text-primary hover:text-primary hover:bg-transparent!"
          >
            Clear all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterButton;
