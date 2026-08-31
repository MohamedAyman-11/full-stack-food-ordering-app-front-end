import ImageInput from '@/components/ui/ImageInput';
import InputField from '@/components/ui/InputField';
import type { Extra, InputType, Size } from '@/interfaces';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field';

import { Checkbox } from '@/components/ui/checkbox';
import CustomAccordion from '../CustomAccordion';
import LoadingButton from '@/components/ui/LoadingButton';
import { Button, buttonVariants } from '@/components/ui/button';
import CustomTextarea from '../CustomTextarea';
import CustomSelect from '../CustomSelect';
import { ProductSchemaUpdate, type ProductSchemaUpdateInput, type ProductSchemaUpdateOutput } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import useGetCategories from '@/hooks/categories/useGetCategories';
import useGetCategoryOptions from '@/hooks/categories/useGetCategoryOptions';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { useGetProductUpdate } from '@/hooks/products/useGetProduct';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../extras/Loading';
import useUpdateProduct from '@/hooks/products/useUpdateProduct';
import { Pages, Routes } from '@/constants';

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    type: 'text',
  },
  {
    id: crypto.randomUUID(),
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
    type: 'text',
  },
  {
    id: crypto.randomUUID(),
    label: 'Price',
    name: 'price',
    placeholder: 'Price',
    type: 'number',
  },
  {
    id: crypto.randomUUID(),
    type: 'number',
    label: 'Discount',
    name: 'discount',
    placeholder: 'Discount',
  },
];

type State = {
  id: string;
  itemId: string;
  price: string;
};

const UpdateProductForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending: isUpdating } = useUpdateProduct();
  const params = useParams();
  const { data: product, isPending: isWaiting } = useGetProductUpdate(params.id ?? '');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductSchemaUpdateInput, any, ProductSchemaUpdateOutput>({
    mode: 'onChange',
    resolver: zodResolver(ProductSchemaUpdate),
    defaultValues: {
      image: undefined,
      category: '',
    },
  });
  const categoryId = watch('category');
  const file = watch('image');
  const { data: categories, isPending } = useGetCategories();
  const { data: options, isLoading } = useGetCategoryOptions(categoryId);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [productSizes, setProductSizes] = useState<State[]>([]);
  const [productExtras, setProductExtras] = useState<State[]>([]);
  const [sizes, setSizes] = useState([]);
  const [extras, setExtras] = useState([]);

  const onSubmit: SubmitHandler<ProductSchemaUpdateOutput> = async ({
    category,
    description,
    discount,
    image,
    name,
    price,
  }) => {
    try {
      const formData = new FormData();

      if (image) {
        formData.append('product_image', image);
      }

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', String(price));
      formData.append('discount', String(discount));
      formData.append('category', category);
      formData.append('isAvailable', String(isAvailable));

      if (productSizes.length > 0 && productSizes.every((size) => size.itemId && size.price)) {
        formData.append('sizes', JSON.stringify(productSizes.map((size) => ({ id: size.itemId, price: size.price }))));
      }

      if (productExtras.length > 0 && productExtras.every((extra) => extra.itemId && extra.price)) {
        formData.append(
          'extras',
          JSON.stringify(productExtras.map((extra) => ({ id: extra.itemId, price: extra.price }))),
        );
      }
      await mutateAsync({ data: formData, id: product.id });
      navigate(`/${Routes.ADMIN}/${Pages.ITEMS}`, { replace: true });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  const onCancel = () => {
    setProductExtras([]);
    setProductSizes([]);
    reset({
      name: '',
      description: '',
      category: '',
      discount: '',
      price: '',
    });
    navigate(`/${Routes.ADMIN}/${Pages.ITEMS}`, { replace: true });
  };

  useEffect(() => {
    if (!options) return;
    const sizes = options.sizes.map((item: { size: { name: string; id: string } }) => item.size);
    setSizes(sizes);
    const extras = options.extras.map((item: { extra: { name: string; id: string } }) => item.extra);
    setExtras(extras);
  }, [options]);

  useEffect(() => {
    if (!product) return;
    reset({
      name: product.name,
      description: product.description,
      category: product.categoryId,
      discount: product.discount,
      price: product.price,
    });

    const selectedSizes = product.productSizes.map((size: Size) => ({
      id: crypto.randomUUID(),
      itemId: size.size.id,
      price: size.price,
    }));
    setProductSizes(selectedSizes);

    const selectedExtras = product.productExtras.map((extra: Extra) => ({
      id: crypto.randomUUID(),
      itemId: extra.extra.id,
      price: extra.price,
    }));
    setProductExtras(selectedExtras);
  }, [product]);

  if (isWaiting) return <Loading />;
  return (
    <div className="w-full mt-5 mb-10 animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:items-start lg:flex-row gap-6 w-full">
          <ImageInput
            file={file || null}
            setFile={(file) => {
              setValue('image', file as File, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
            defaultImage={product && product.image.url}
            error={errors.image?.message?.toString() || ''}
          />

          <div className="flex-1 space-y-5">
            {FORM_INPUTS.slice(0, 2).map((input) => (
              <div key={input.id}>
                {input.name === 'description' ? (
                  <CustomTextarea
                    input={input}
                    register={register(input.name as keyof ProductSchemaUpdateInput)}
                    error={errors[input?.name as keyof ProductSchemaUpdateInput]?.message?.toString()}
                  />
                ) : (
                  <InputField
                    input={input}
                    register={register(input.name as keyof ProductSchemaUpdateInput)}
                    error={errors[input?.name as keyof ProductSchemaUpdateInput]?.message?.toString()}
                  />
                )}
              </div>
            ))}

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(2, 4).map((input) => (
                <InputField
                  input={input}
                  key={input.id}
                  register={register(input.name as keyof ProductSchemaUpdateInput)}
                  error={errors[input?.name as keyof ProductSchemaUpdateInput]?.message?.toString()}
                />
              ))}
            </div>

            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor="category" className="w-fit text-sm font-medium text-slate-700">
                    Category
                  </FieldLabel>

                  <CustomSelect
                    isPending={isPending}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    categories={categories}
                  />
                </Field>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <CustomAccordion
                state={productSizes}
                setState={setProductSizes}
                type="size"
                data={sizes}
                category={categoryId}
                isPending={isLoading}
              />
              <CustomAccordion
                state={productExtras}
                setState={setProductExtras}
                type="extra"
                data={extras}
                category={categoryId}
                isPending={isLoading}
              />
            </div>

            <Field
              orientation="horizontal"
              className="flex extras-center gap-2 cursor-pointer"
              onClick={() => setIsAvailable((prev) => !prev)}
            >
              <Checkbox id={'role'} name={'role'} checked={isAvailable} />
              <FieldLabel htmlFor={'role'} className="font-semibold text-accent flex-1 cursor-pointer">
                Available
              </FieldLabel>
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-5">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className={`${buttonVariants({
              size: 'lg',
            })}  h-10! md:h-11! flex-1 rounded-lg border-0! bg-gray-200! px-8! py-4! font-semibold! 
                     text-black!  shadow-sm transition-all hover:bg-gray-200/90!
                      hover:shadow-md! cursor-pointer!`}
          >
            Cancel
          </Button>
          <LoadingButton
            isLoading={isUpdating}
            disabled={isUpdating}
            type="submit"
            variant="outline"
            className={`${buttonVariants({
              size: 'lg',
            })}  h-10! md:h-11! flex-1  rounded-lg border-0! bg-primary! px-8!
                     py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90!
                      hover:shadow-md! cursor-pointer!`}
          >
            Save change
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
