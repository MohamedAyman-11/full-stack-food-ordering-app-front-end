import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash, Plus } from 'lucide-react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import toast from 'react-hot-toast';
import LoadingButton from '@/components/ui/LoadingButton';

interface Props {
  type: 'extra' | 'size';
  data: {
    name: string;
    id: string;
  }[];
  state: State[];
  setState: Dispatch<SetStateAction<State[]>>;
  category: string;
  isPending: boolean;
}
type State = {
  id: string;
  itemId: string;
  price: string;
};

const CustomAccordion = ({ type, data, state, setState, category, isPending }: Props) => {
  // Add New
  const onAddNewItemHandler = () => {
    if (!category) {
      toast.error('Please select a category first!', { duration: 5000 });
      return;
    }
    setState((prev) => [...prev, { id: crypto.randomUUID(), itemId: '', price: '' }]);
  };
  // Update
  const onChangeSelect = (value: string, id: string) => {
    setState((prev) => prev.map((item) => (item.id === id ? { ...item, itemId: value } : item)));
  };
  // Update Price
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.value;
    setState((prev) => prev.map((item) => (item.id === id ? { ...item, price: value } : item)));
  };
  // Delete
  const onDelete = (id: string) => {
    setState((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Accordion defaultValue={[{ type }]}>
      <AccordionItem id="size" className={'bg-gray-100 rounded-xl px-3'}>
        <AccordionTrigger className={'hover:no-underline! text-lg font-semibold items-center cursor-pointer py-3'}>
          {type === 'extra' ? 'Extras' : 'Sizes'}
        </AccordionTrigger>
        <AccordionContent>
          {state.length > 0 && (
            <ul className="mb-3 space-y-3">
              {state.map((el) => {
                const availableData =
                  data &&
                  data.filter((size) => {
                    const isUsedInAnotherRow = state.some((item) => {
                      return item.itemId === size.id && item.id !== el.id;
                    });

                    return !isUsedInAnotherRow;
                  });
                return (
                  <li
                    className="flex items-center justify-between gap-3 py-2
                     animate-in fade-in-20 slide-in-from-bottom-2  duration-300"
                    key={el.id}
                  >
                    <CustomSelect
                      data={availableData}
                      onChangeSelect={(value) => {
                        if (value) {
                          onChangeSelect(value, el.id);
                        }
                      }}
                      selectedItem={el.itemId}
                      type={type}
                    />
                    <InputGroup
                      className={` rounded-lg border-slate-200  shadow-none transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10`}
                    >
                      <InputGroupInput
                        className={`flex-1 text-sm placeholder:text-slate-400 
                        placeholder:select-none rounded-lg`}
                        id="price"
                        name="price"
                        placeholder="Price"
                        type="number"
                        value={el.price}
                        onChange={(e) => onChangePrice(e, el.id)}
                        min={0}
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      variant={'destructive'}
                      className={'cursor-pointer min-w-12'}
                      onClick={() => onDelete(el.id)}
                    >
                      <Trash />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
          <LoadingButton
            isLoading={isPending}
            disabled={isPending}
            onClick={onAddNewItemHandler}
            type="button"
            size={'lg'}
            className={
              'cursor-pointer w-full bg-white border border-border text-black transition-all duration-300 hover:bg-gray-200 [&>svg]:text-black'
            }
          >
            <Plus />
            Add {type === 'extra' ? 'Extras' : 'Sizes'}
          </LoadingButton>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;

interface SelectProps {
  type: 'extra' | 'size';
  onChangeSelect: (value: string | null) => void;
  selectedItem: string | null;
  data: {
    name: string;
    id: string;
  }[];
}

const CustomSelect = ({ data, onChangeSelect, selectedItem, type }: SelectProps) => {
  const item = data.find((el) => el.id === selectedItem);
  console.log(item);

  return (
    <Select value={selectedItem} onValueChange={onChangeSelect}>
      <SelectTrigger className={`w-full  border-gray-300! min-h-[44px!] py-4!`}>
        <SelectValue>{item?.name || 'Select...'}</SelectValue>
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="start"
        alignItemWithTrigger={false}
        className={`data-open:animate-in
          data-open:fade-in-0
          data-open:zoom-in-95
          data-closed:animate-out
          data-closed:fade-out-0
          data-closed:zoom-out-95
          duration-300`}
      >
        <SelectGroup>
          <SelectLabel>{type === 'extra' ? 'Extras' : 'Sizes'}</SelectLabel>
          {data.length > 0 ? (
            data.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
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
              data-[selected]:[&>div]:text-white!
              data-[selected]:[&>svg]:text-white!

              [&>span]:text-inherit!
                  `}
              >
                {item.name}
              </SelectItem>
            ))
          ) : (
            <h2 className="p-2">No {type === 'extra' ? 'extras' : 'sizes'} found for this category </h2>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
