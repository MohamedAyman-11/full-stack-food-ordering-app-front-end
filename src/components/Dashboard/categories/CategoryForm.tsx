import ImageInput from '@/components/ui/ImageInput';
import type { InputType } from '@/interfaces';
import { useState } from 'react';
import CustomAccordion from './CustomAccordion';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import useGetExtras from '@/hooks/extras/useGetExtra';
import LoadingButton from '@/components/ui/LoadingButton';
import { Button, buttonVariants } from '@/components/ui/button';
import useCreateCategory from '@/hooks/categories/useCreateCategory';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { categorySchema, type CategorySchemaType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import InputField from '@/components/ui/InputField';
import type { CategoryFieldName } from '@/types/inputs';
type Input = {
  label: string;
  name: CategoryFieldName;
  placeholder: string;
  type: InputType;
};
const FORM_INPUTS: Input[] = [
  {
    label: 'Category name',
    name: 'category_name',
    placeholder: 'Category name',
    type: 'text',
  },
];

type State = {
  id: string;
  itemId: string;
};

interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}
const CategoryForm = ({ showForm, setShowForm }: Props) => {
  const { mutateAsync, isPending } = useCreateCategory();
  const { data: sizes } = useGetSizes();
  const { data: extras } = useGetExtras();
  const [categorySizes, setCategorySizes] = useState<State[]>([]);
  const [categoryExtras, setCategoryExtras] = useState<State[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
    defaultValues: {
      image: undefined,
      category_name: '',
    },
  });
  const file = watch('image');

  const onSubmit: SubmitHandler<CategorySchemaType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.category_name);

      if (categorySizes.length > 0) {
        const filteredSizes = categorySizes.filter((item) => item.itemId);
        formData.append('sizeIds', JSON.stringify(filteredSizes.map((el) => el.itemId)));
      }

      if (categoryExtras.length > 0) {
        const filteredExtras = categoryExtras.filter((item) => item.itemId);
        formData.append('extraIds', JSON.stringify(filteredExtras.map((el) => el.itemId)));
      }

      formData.append('category_image', file!);

      await mutateAsync(formData);

      setShowForm(false);
      setCategoryExtras([]);
      setCategorySizes([]);
      reset({
        category_name: '',
        image: undefined,
      });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  const onCancel = () => {
    setShowForm && setShowForm(false);
    setCategoryExtras([]);
    setCategorySizes([]);
    reset({
      category_name: '',
      image: undefined,
    });
  };

  return (
    showForm && (
      <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2 duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
          <div className="flex flex-col lg:items-start lg:flex-row gap-8 w-full">
            <div className="flex flex-col">
              <ImageInput
                file={file}
                setFile={(file) =>
                  setValue('image', file as File, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
                defaultImage=""
                error={errors.image?.message}
              />
            </div>

            <div className="flex-1 space-y-5">
              {FORM_INPUTS.map((input) => (
                <InputField
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                <div>
                  <CustomAccordion data={sizes} type="size" state={categorySizes} setState={setCategorySizes} />
                </div>
                <div>
                  <CustomAccordion data={extras} type="extra" state={categoryExtras} setState={setCategoryExtras} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Button
              onClick={onCancel}
              type="button"
              className={`${buttonVariants({
                size: 'lg',
              })} flex-1 px-8! py-4! font-semibold! 
             text-black! bg-gray-200! hover:bg-gray-300!`}
            >
              Cancel
            </Button>
            <LoadingButton
              isPending={isPending}
              disabled={isPending}
              type="submit"
              variant="default"
              className={`${buttonVariants({
                size: 'lg',
              })}  flex-1  px-8! py-4! font-semibold`}
            >
              Create category
            </LoadingButton>
          </div>
        </form>
      </div>
    )
  );
};

export default CategoryForm;
