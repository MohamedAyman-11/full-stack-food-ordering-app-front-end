import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Trash } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';
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

interface Props {
  type: 'extra' | 'size';
  data: {
    name: string;
    id: string;
  }[];
  state: State[];
  setState: Dispatch<SetStateAction<State[]>>;
}
type State = {
  id: string;
  itemId: string;
};
const CustomAccordion = ({ data, type, state, setState }: Props) => {
  const onAddNewItemHandler = () => {
    setState((prev) => {
      return [
        ...prev,
        {
          itemId: '',
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  const onChangeSelect = (value: string, id: string) => {
    setState((prev) => prev.map((item) => (item.id === id ? { ...item, itemId: value } : item)));
  };

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
          <Button
            onClick={onAddNewItemHandler}
            type="button"
            size={'lg'}
            className={
              'cursor-pointer w-full bg-white border border-border text-black transition-all duration-300 hover:bg-gray-200'
            }
          >
            <Plus />
            Add {type === 'extra' ? 'Extras' : 'Sizes'}
          </Button>
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
  return (
    <Select value={selectedItem} onValueChange={onChangeSelect}>
      <SelectTrigger className="w-full  border-gray-300! ">
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
            <h2 className="p-2">No {type === 'extra' ? 'extras' : 'sizes'} found </h2>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
