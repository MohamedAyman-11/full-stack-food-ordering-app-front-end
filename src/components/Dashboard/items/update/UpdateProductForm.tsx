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
import CustomTextarea from '../../../ui/CustomTextarea';
import CustomSelect from '../CustomSelect';
import { ProductSchemaUpdate, type ProductSchemaUpdateInput, type ProductSchemaUpdateOutput } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import useGetCategories from '@/hooks/categories/useGetCategories';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { useGetProductUpdate } from '@/hooks/products/useGetProduct';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Loading';
import useUpdateProduct from '@/hooks/products/useUpdateProduct';
import { Pages, Routes } from '@/constants';
import type { ProductFieldName } from '@/types/inputs';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import useGetExtras from '@/hooks/extras/useGetExtra';

type Input = {
  name: ProductFieldName;
  type: InputType;
  label: string;
  placeholder: string;
};

const FORM_INPUTS: Input[] = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
    type: 'text',
  },
  {
    type: 'number',
    label: 'Price',
    name: 'price',
    placeholder: 'Base price',
  },
  {
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
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
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
  const file = watch('image');
  const { data: categories, isPending } = useGetCategories();
  const { data: sizesData, isLoading: isGettingSizes } = useGetSizes();
  const { data: extrasData, isLoading: isGettingExtras } = useGetExtras();

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

      if (productSizes.length > 0) {
        const filteredSizes = productSizes.filter((item) => item.itemId && item.price);
        formData.append('sizes', JSON.stringify(filteredSizes.map((size) => ({ id: size.itemId, price: size.price }))));
      }

      if (productExtras.length > 0) {
        const filteredExtras = productExtras.filter((item) => item.itemId && item.price);
        formData.append('extras', JSON.stringify(filteredExtras.map((el) => ({ id: el.itemId, price: el.price }))));
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
    });
    navigate(`/${Routes.ADMIN}/${Pages.ITEMS}`, { replace: true });
  };

  useEffect(() => {
    if (!sizesData) return;

    setSizes(sizesData);
  }, [sizesData]);

  useEffect(() => {
    if (!extrasData) return;

    setExtras(extrasData);
  }, [extrasData]);

  useEffect(() => {
    if (!product) return;
    reset({
      name: product.name,
      description: product.description,
      category: product.categoryId,
      discount: product.discount,
      price: product.price,
    });
    const isAvailable = product.isAvailable;
    setIsAvailable(isAvailable);
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
    <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2 duration-300">
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
            error={errors.image?.message || ''}
          />

          <div className="flex-1 space-y-5">
            {FORM_INPUTS.slice(0, 2).map((input) => (
              <div key={input.name}>
                {input.name === 'description' ? (
                  <CustomTextarea input={input} register={register(input.name)} error={errors[input.name]?.message} />
                ) : (
                  <InputField input={input} register={register(input.name)} error={errors[input.name]?.message} />
                )}
              </div>
            ))}

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORM_INPUTS.slice(2, 4).map((input) => (
                <InputField
                  input={input}
                  key={input.name}
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                />
              ))}
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <CustomAccordion
                state={productSizes}
                setState={setProductSizes}
                type="size"
                data={sizes}
                isPending={isGettingSizes}
              />
              <CustomAccordion
                state={productExtras}
                setState={setProductExtras}
                type="extra"
                data={extras}
                isPending={isGettingExtras}
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
            isPending={isUpdating}
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
