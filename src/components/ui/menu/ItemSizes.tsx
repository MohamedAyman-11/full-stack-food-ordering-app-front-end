import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Size } from '@/interfaces';
import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';
import type { Dispatch, SetStateAction } from 'react';
interface Props {
  sizes: Size[];
  setSelectedSize: Dispatch<SetStateAction<Size>>;
  selectedSize: Size | undefined;
  discount: number;
}
const ItemSizes = ({ sizes, setSelectedSize, selectedSize, discount }: Props) => {
  return (
    <>
      <div>
        <h4 className="font-semibold text-center">Pick your size</h4>
        <RadioGroup
          aria-label="Density"
          defaultValue="comfortable"
          className="w-full mt-3"
          value={selectedSize?.size.id || ''}
          onValueChange={(value) => {
            const selectedSize = sizes.find((size) => size.size.id === value);
            if (selectedSize) setSelectedSize(selectedSize);
          }}
        >
          {sizes.map((size) => (
            <div className="flex items-center gap-3 border w-full py-2 px-2 rounded-md" key={size.size.id}>
              <RadioGroupItem value={size.size.id} id={size.size.id} className={'cursor-pointer'} />
              <Label htmlFor={size.size.id} className="font-semibold text-accent flex-1 cursor-pointer">
                {size.size.name}{' '}
                <span className="text-gray-500">
                  ({formatCurrency(getPriceAfterDiscount(Number(size.price), discount))})
                </span>
                {discount > 0 && (
                  <span className="ml-px text-sm text-gray-400 line-through">{formatCurrency(Number(size.price))}</span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default ItemSizes;
