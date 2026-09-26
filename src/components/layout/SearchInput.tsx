import { Search, X } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Field } from '../ui/field';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { Routes } from '@/constants';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const trimmedValue = value.trim();
  const canSearch = trimmedValue.length >= 3;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSearchHandler = () => {
    if (!canSearch) return;

    navigate(`/${Routes.SEARCH}?q=${encodeURIComponent(trimmedValue)}`);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchHandler();
    }
  };
  const onClearHandler = () => {
    setValue('');
  };

  return (
    <>
      <div className="w-full min-w-35 md:min-w-90">
        <Field className="gap-2 ">
          <InputGroup className="h-11 rounded-full!">
            {value.length >= 3 && (
              <InputGroupAddon
                onClick={onSearchHandler}
                align="inline-start"
                className={`${buttonVariants({ size: 'sm', variant: 'ghost' })} cursor-pointer 
                hover:bg-secondary! rounded-full `}
              >
                <Search />
              </InputGroupAddon>
            )}
            <Input
              onKeyDown={onKeyDownHandler}
              value={value}
              onChange={onChangeHandler}
              placeholder="What are you looking for?"
              type={'text'}
              className={`h-full border-0! bg-transparent pl-4 pr-1 text-sm shadow-none!
                 outline-none! ring-0! focus-visible:ring-0!"`}
            />

            {value.length > 0 && (
              <InputGroupAddon
                onClick={onClearHandler}
                align="inline-end"
                className={`${buttonVariants({ size: 'sm', variant: 'ghost' })} cursor-pointer 
                hover:bg-secondary! rounded-full !`}
              >
                <X />
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      </div>
    </>
  );
};
export default SearchInput;
