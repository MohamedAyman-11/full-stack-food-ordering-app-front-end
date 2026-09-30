import { Button, buttonVariants } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import ImageInput from '@/components/ui/ImageInput';
import { useEffect } from 'react';
import type { InputType } from '@/interfaces';
import useGetCategory from '@/hooks/categories/useGetCategory';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Loading';
import { Pages, Routes } from '@/constants';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useUpdateCategory from '@/hooks/categories/useUpdateCategory';
import type { CategoryFieldName } from '@/types/inputs';
import {
  categorySchemaUpdate,
  type CategorySchemaUpdateInputType,
  type CategorySchemaUpdateOutPutType,
} from '@/validation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/ui/InputField';

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

const UpdateCategoryForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutateAsync, isPending: isUpdating } = useUpdateCategory();

  const id = params.id ?? '';
  const { data: category, isPending } = useGetCategory(id);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategorySchemaUpdateInputType, any, CategorySchemaUpdateOutPutType>({
    mode: 'onChange',
    resolver: zodResolver(categorySchemaUpdate),
    defaultValues: {
      image: undefined,
      category_name: '',
    },
  });

  const file = watch('image');
  console.log(errors);

  const onSubmit: SubmitHandler<CategorySchemaUpdateOutPutType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.category_name);

      if (file) {
        formData.append('category_image', file);
      }

      await mutateAsync({ data: formData, id: category.id });

      navigate(`/${Routes.ADMIN}/${Pages.CATEGORIES}`, { replace: true });

      reset({ category_name: '', image: undefined });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  useEffect(() => {
    if (!category) return;

    reset({
      category_name: category.name,
    });
  }, [category, id]);

  const onCancel = () => {
    reset({
      category_name: '',
      image: undefined,
    });

    navigate(`/${Routes.ADMIN}/${Pages.CATEGORIES}`, { replace: true });
  };

  if (isPending) return <Loading />;

  return (
    <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2 duration-300">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
        <div className="flex flex-col lg:items-start lg:flex-row gap-8 w-full">
          <ImageInput
            file={file || null}
            setFile={(file) => {
              setValue('image', file as File, {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
              });
            }}
            defaultImage={category && category.image.url}
          />
          <div className="flex-1 space-y-5">
            {FORM_INPUTS.map((input) => (
              <InputField
                input={input}
                key={input.name}
                register={register(input.name)}
                error={errors[input.name]?.message}
              />
            ))}
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
            isPending={isUpdating}
            disabled={isUpdating}
            type="submit"
            variant="default"
            className={`${buttonVariants({
              size: 'lg',
            })}  flex-1  px-8! py-4! font-semibold`}
          >
            Save Changes
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
