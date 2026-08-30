import { Button, buttonVariants } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import CustomAccordion from '../CustomAccordion';
import ImageInput from '@/components/ui/ImageInput';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import useGetExtras from '@/hooks/extras/useGetExtra';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import type { Extra, InputType, Size } from '@/interfaces';
import { validate } from '@/validation/custom';
import useGetCategory from '@/hooks/categories/useGetCategory';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../extras/Loading';
import { Messages, Pages, Routes } from '@/constants';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import useUpdateCategory from '@/hooks/categories/useUpdateCategory';

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
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

type Errors = {
  categoryName: string;
  categoryImage: string;
};

const UpdateCategoryForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutateAsync, isPending: isUpdating } = useUpdateCategory();

  const id = params.id ?? '';
  const { data, isPending } = useGetCategory(id);
  const { data: sizes } = useGetSizes();
  const { data: extras } = useGetExtras();
  const [file, setFile] = useState<File | null>(null);
  const [categorySizes, setCategorySizes] = useState<State[]>([]);
  const [categoryExtras, setCategoryExtras] = useState<State[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [categoryName, setCategoryName] = useState('');
  const [errors, setErrors] = useState<Errors>({
    categoryName: '',
    categoryImage: '',
  });

  useEffect(() => {
    if (!data) return;

    setCategoryName(data.name);

    setCategorySizes(
      data.categorySizes.map((size: Size) => ({
        id: crypto.randomUUID(),
        itemId: size.size.id,
      })),
    );

    setCategoryExtras(
      data.categoryExtras.map((extra: Extra) => ({
        id: crypto.randomUUID(),
        itemId: extra.extra.id,
      })),
    );

    setPreviewImage(data.image.url);
  }, [data, id]);

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = validate({
      categoryName,
      categoryImage: file ? file : data.image.url,
    });

    const hasErrors = Object.values(errs).some((e) => e !== '');

    if (hasErrors) {
      setErrors(errs);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', categoryName);

      const sendSize = categorySizes.length > 0 && categorySizes.every((item) => item.itemId);
      if (sendSize) {
        formData.append('sizeIds', JSON.stringify(categorySizes.map((el) => el.itemId)));
      }

      const sendExtra = categoryExtras.length > 0 && categoryExtras.every((item) => item.itemId);
      if (sendExtra) {
        formData.append('extraIds', JSON.stringify(categoryExtras.map((el) => el.itemId)));
      }

      if (file) {
        formData.append('category_image', file);
      }

      await mutateAsync({ data: formData, id: data.id });

      toast.success(Messages.CATEGORY_UPDATED);

      navigate(`/${Routes.ADMIN}/${Pages.CATEGORIES}`, { replace: true });

      setCategoryName('');
      setCategoryExtras([]);
      setCategorySizes([]);
      setFile(null);
      setErrors({
        categoryName: '',
        categoryImage: '',
      });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  const onCancel = () => {
    setCategoryExtras([]);
    setCategorySizes([]);
    setFile(null);
    setPreviewImage('');
    setCategoryName('');
    setErrors({
      categoryName: '',
      categoryImage: '',
    });

    navigate(`/${Routes.ADMIN}/${Pages.CATEGORIES}`, { replace: true });
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategoryName(value);

    if (value.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        categoryName: 'Category name must be 3 character at least',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        categoryName: '',
      }));
    }
  };

  if (isPending) return <Loading />;

  return (
    <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2  duration-300">
      <form onSubmit={onSubmit} className=" space-y-8">
        <div className="flex flex-col lg:items-start lg:flex-row gap-8 w-full">
          <div className="flex flex-col">
            <ImageInput file={file} setFile={setFile} defaultImage={previewImage} setErrors={setErrors} />
            {errors.categoryImage && <p className="text-sm text-destructive mt-1">{errors.categoryImage}</p>}
          </div>
          <div className="flex-1 space-y-5">
            {FORM_INPUTS.map((input) => (
              <div key={input.id}>
                <Label htmlFor={input.id} className="w-fit text-sm font-medium text-slate-700 mb-2">
                  {input.label}
                </Label>
                <InputGroup
                  className={` h-11 rounded-lg border-slate-200 bg-white shadow-none transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10
                  ${errors.categoryName ? 'border-destructive ' : 'border-slate-200'}`}
                >
                  <InputGroupInput
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    placeholder={input.placeholder}
                    value={categoryName}
                    onChange={onChangeHandler}
                    className={`text-sm placeholder:text-slate-400 placeholder:select-none rounded-lg  bg-white`}
                  />
                </InputGroup>
                {errors.categoryName && <p className="text-sm text-destructive mt-1">{errors.categoryName}</p>}
              </div>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
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
            Save changes
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
