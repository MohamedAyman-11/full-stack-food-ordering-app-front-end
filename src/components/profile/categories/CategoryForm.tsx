import ImageInput from "@/components/ui/ImageInput";
import type { InputType } from "@/interfaces";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import CustomAccordion from "./CustomAccordion";
import useGetSizes from "@/hooks/sizes/useGetSizes";
import useGetExtras from "@/hooks/extras/useGetExtra";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { validate } from "@/validation/custom";
import useCreateCategory from "@/hooks/categories/useCreateCategory";
import toast from "react-hot-toast";
import { Messages } from "@/constants";
import { axiosErrorHandler } from "@/lib/functions";
const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Category name",
    name: "category_name",
    placeholder: "Category name",
    type: "text",
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
interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}
const CategoryForm = ({ showForm, setShowForm }: Props) => {
  const { mutateAsync, isPending } = useCreateCategory();
  const { data: sizes } = useGetSizes();
  const { data: extras } = useGetExtras();
  const [file, setFile] = useState<File | null>(null);
  const [categorySizes, setCategorySizes] = useState<State[]>([]);
  const [categoryExtras, setCategoryExtras] = useState<State[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState<Errors>({
    categoryName: "",
    categoryImage: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategoryName(value);

    if (value.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        categoryName: "Category name must be 3 characters at least",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        categoryName: "",
      }));
    }
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate({
      categoryName,
      categoryImage: file,
    });
    const hasErrors = Object.values(errs).some((e) => e !== "");
    if (hasErrors) {
      setErrors(errs);
      console.log("Has");

      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      if (
        categorySizes.length > 0 &&
        categorySizes.every((item) => item.itemId)
      ) {
        formData.append(
          "sizeIds",
          JSON.stringify(categorySizes.map((el) => el.itemId)),
        );
      }
      if (
        categoryExtras.length > 0 &&
        categoryExtras.every((item) => item.itemId)
      ) {
        formData.append(
          "extraIds",
          JSON.stringify(categoryExtras.map((el) => el.itemId)),
        );
      }
      formData.append("category_image", file!);

      await mutateAsync(formData);
      toast.success(Messages.CATEGORY_CREATED);
      setShowForm(false);
      setCategoryName("");
      setCategoryExtras([]);
      setCategorySizes([]);
      setFile(null);
      setErrors({
        categoryName: "",
        categoryImage: "",
      });
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  const onCancel = () => {
    setShowForm && setShowForm(false);
    setCategoryName("");
    setCategoryExtras([]);
    setCategorySizes([]);
    setFile(null);
    setErrors({
      categoryName: "",
      categoryImage: "",
    });
  };
  return (
    showForm && (
      <div className="w-full mt-5 animate-in fade-in-20 slide-in-from-bottom-2  duration-300">
        <form onSubmit={onSubmit} className=" space-y-8">
          <div className="flex flex-col lg:items-start lg:flex-row gap-8 w-full">
            <div className="flex flex-col">
              <ImageInput
                file={file}
                setFile={setFile}
                defaultImage=""
                setErrors={setErrors}
              />
              {errors.categoryImage && (
                <p className="text-sm text-destructive mt-1">
                  {errors.categoryImage}
                </p>
              )}
            </div>
            <div className="flex-1 space-y-5">
              {FORM_INPUTS.map((input) => (
                <div key={input.id}>
                  <Label
                    htmlFor={input.id}
                    className="w-fit text-sm font-medium text-slate-700 mb-2"
                  >
                    {input.label}
                  </Label>
                  <InputGroup
                    className={` h-11 rounded-lg border-slate-200 bg-white shadow-none transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10
                  ${errors.categoryName ? "border-destructive " : "border-slate-200"}`}
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
                  {errors.categoryName && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.categoryName}
                    </p>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                <div>
                  <CustomAccordion
                    data={sizes}
                    type="size"
                    state={categorySizes}
                    setState={setCategorySizes}
                  />
                </div>
                <div>
                  <CustomAccordion
                    data={extras}
                    type="extra"
                    state={categoryExtras}
                    setState={setCategoryExtras}
                  />
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
                size: "lg",
              })}  h-10! md:h-11! flex-1 rounded-lg border-0! bg-gray-200! px-8! py-4! font-semibold! 
             text-black!  shadow-sm transition-all hover:bg-gray-200/90!
              hover:shadow-md! cursor-pointer!`}
            >
              Cancel
            </Button>
            <LoadingButton
              isLoading={isPending}
              disabled={isPending}
              type="submit"
              variant="outline"
              className={`${buttonVariants({
                size: "lg",
              })}  h-10! md:h-11! flex-1  rounded-lg border-0! bg-primary! px-8!
             py-4! font-semibold! text-white! shadow-sm transition-all hover:bg-primary/90!
              hover:shadow-md! cursor-pointer!`}
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
