import { FieldError } from '@/components/ui/field';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/interfaces';
import { useEffect, useState } from 'react';

const items = [{ label: 'Apple', value: 'apple' }];

interface Props {
  value: string;
  onChange: (value: string | null) => void;
  error?: string;
  categories: Category[];
  isPending: boolean;
}
const CustomSelect = ({ value, onChange, error, categories, isPending }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!categories) return;
    const category = categories.find((el) => el.id === value)?.name;

    setSelectedCategory(category || '');
  }, [categories, value]);
  return (
    <div>
      <Select items={items} value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full max-w-60 ">
          <SelectValue>{selectedCategory || 'Select category...'}</SelectValue>
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          align="start"
          side="bottom"
          className={`${isPending ? 'py-3' : ''} data-open:animate-in
          data-open:fade-in-0
          data-open:zoom-in-95
          data-closed:animate-out
          data-closed:fade-out-0
          data-closed:zoom-out-95
          duration-300`}
        >
          <SelectGroup>
            {isPending ? (
              <LoadingSpinner size="size-5" />
            ) : (
              categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
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
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && !isPending && <FieldError className="mt-2">{error}</FieldError>}
    </div>
  );
};

export default CustomSelect;
