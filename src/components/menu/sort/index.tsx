import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
interface SortProps {
  productCount: number;
  isPending: boolean;
  option: string;
  setOption: (val: string) => void;
}
const Sort = ({ productCount, isPending, option, setOption }: SortProps) => {
  const [_, setSearchParams] = useSearchParams();
  const selectedOption = sortOptions.find((opt) => opt.value === option)?.label;

  const onChangeHandler = (value: string) => {
    setOption(value);
    setSearchParams((prev) => {
      prev.set('sort', value);
      return prev;
    });
  };

  return (
    <div className="flex items-center justify-between ">
      <div>
        <h2 className="text-3xl font-bold text-primary">All Products</h2>
        {isPending ? (
          <div className="mt-2">
            <LoadingSpinner size="size-5" />
          </div>
        ) : (
          <h4 className="font-semibold text-gray-700">
            {productCount} {productCount === 1 ? 'product' : 'products'} found
          </h4>
        )}
      </div>

      <div className="hidden lg:block min-w-45 ">
        <Select items={sortOptions} value={option} onValueChange={(value) => onChangeHandler(value!)}>
          <SelectTrigger className={`w-full bg-white`}>
            <SelectValue>{selectedOption}</SelectValue>
          </SelectTrigger>
          <SelectContent
            alignItemWithTrigger={false}
            align="start"
            side="bottom"
            className={` data-open:animate-in
          data-open:fade-in-0
          data-open:zoom-in-95
          data-closed:animate-out
          data-closed:fade-out-0
          data-closed:zoom-out-95
          duration-300`}
          >
            <SelectGroup>
              {sortOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`
              mb-1
              last:mb-0
              cursor-pointer
              font-medium

              hover:bg-primary!
              hover:text-white!
              hover:[&>div]:text-white!
              hover:[&>svg]:text-white!

              data-[selected]:bg-primary!
            data-[selected]:text-white!

                  `}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sort;
