import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router-dom';

const sortOptions: { label: string; value: string }[] = [
  {
    label: 'Most Recent',
    value: 'recent_desc',
  },
  {
    label: 'Price: High → Low',
    value: 'price_desc',
  },
  {
    label: 'Price: Low → High',
    value: 'price_asc',
  },
  {
    label: 'Biggest Discount',
    value: 'discount_desc',
  },
];

const SortButton = () => {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent_desc');
  const [_, setSearchParams] = useSearchParams();
  const onClickHandler = () => {
    setSearchParams((prev) => {
      prev.set('sort', sortBy);
      return prev;
    });
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <SheetTrigger
        render={
          <Button
            className={
              'py-5! flex-1 border border-border cursor-pointer bg-secondary shadow-[inset_0_0px_1px_rgba(0,0,0,0.1)] hover:bg-slate-200! transition-all duration-300'
            }
          >
            <ArrowDownUp className="h-6 w-6 text-primary" />
            <h2 className="text-[16px] font-bold text-black">Sort</h2>
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
          <SheetTitle className="text-lg font-bold">Sort By</SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="overflow-y-auto px-5 ">
          <RadioGroup
            aria-label="Density"
            defaultValue="comfortable"
            className="w-full mt-3"
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            {sortOptions.map((option) => (
              <div className="flex items-center gap-3 border w-full py-2 px-2 rounded-md" key={option.value}>
                <RadioGroupItem value={option.value} id={option.value} className={'cursor-pointer'} />
                <Label htmlFor={option.value} className="font-semibold text-accent flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Footer */}
        <SheetFooter className="border-t bg-background px-5 gap-1!">
          <Button className={'cursor-pointer w-full h-10 font-semibold'} onClick={onClickHandler}>
            Apply{' '}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SortButton;
