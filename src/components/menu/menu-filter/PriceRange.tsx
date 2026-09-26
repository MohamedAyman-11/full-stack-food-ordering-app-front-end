import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { type Dispatch, type SetStateAction } from 'react';
import { formatCurrency } from '../../../lib/functions';
interface Props {
  prices: number[];
  setPrices: Dispatch<SetStateAction<number[]>>;
}
const PriceRange = ({ prices, setPrices }: Props) => {
  return (
    <AccordionItem value="price" className={'py-2'}>
      <AccordionTrigger className="hover:no-underline! text-sm font-medium items-center cursor-pointer py-3">
        Price Range
      </AccordionTrigger>
      <AccordionContent>
        <div className="mx-auto grid w-full max-w-xs gap-3 px-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">{formatCurrency(prices[0])}</span>
            <span className="text-sm text-muted-foreground">{formatCurrency(prices[1])}</span>
          </div>
          <Slider
            id="slider-demo-temperature"
            value={prices}
            onValueChange={(value) => setPrices(value as number[])}
            min={0}
            max={20}
            step={0.1}
            className={'cursor-pointer'}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceRange;
