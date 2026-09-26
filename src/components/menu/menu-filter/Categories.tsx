import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useGetCategories from '@/hooks/categories/useGetCategories';
import type { Category } from '@/interfaces';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

const Categories = ({ selectedCategories, setSelectedCategories }: Props) => {
  const { data: categories, isPending } = useGetCategories();

  const handleAllCheckbox = () => {
    setSelectedCategories(['all']);
  };

  const handleCheckbox = (category: string) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category);

      // Remove category
      if (isSelected) {
        const newSelected = prev.filter((item) => item !== category);

        // If nothing is selected, select All
        return newSelected.length === 0 ? ['all'] : newSelected;
      }

      // Select category and remove All

      return [...prev.filter((item) => item !== 'all'), category];
    });
  };

  if (isPending)
    return (
      <>
        <div className="min-h-50 flex items-center justify-center">
          <LoadingSpinner size="size-8" />
        </div>
      </>
    );
  return (
    <AccordionItem value="categories" className={'py-2'}>
      <AccordionTrigger className="hover:no-underline! text-sm font-medium items-center cursor-pointer py-3">
        Categories
      </AccordionTrigger>

      <AccordionContent>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <FieldGroup className="w-full mt-3 gap-3">
            {/* All */}
            <Field
              orientation="horizontal"
              className="flex items-center gap-3 border w-full py-2 px-2 rounded-md cursor-pointer"
              onClick={handleAllCheckbox}
            >
              <Checkbox id="all" checked={selectedCategories.includes('all')} />

              <FieldLabel htmlFor="all" className="font-semibold text-accent flex-1 cursor-pointer">
                All
              </FieldLabel>
            </Field>

            {/* Categories */}
            {categories?.map((category: Category) => (
              <Field
                orientation="horizontal"
                key={category.id}
                className="flex items-center gap-3 border w-full py-2 px-2 rounded-md cursor-pointer"
                onClick={() => handleCheckbox(category.name.toLowerCase())}
              >
                <Checkbox id={category.id} checked={selectedCategories.includes(category.name.toLowerCase())} />

                <FieldLabel htmlFor={category.id} className="font-semibold text-accent flex-1 cursor-pointer">
                  {category.name}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Categories;
