import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/components/ui/InputField";
import LoadingButton from "@/components/ui/LoadingButton";
import { Messages } from "@/constants";
import useUpdateSize from "@/hooks/sizes/useUpdateSize";
import type { InputType } from "@/interfaces";
import { axiosErrorHandler } from "@/lib/functions";
import { sizeSchema, type SizeSchemaType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  id: string;
  sizeName: string;
}

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Size name",
    name: "size_name",
    placeholder: "e.g. Medium",
    type: "text",
  },
];
const EditSize = ({ id, sizeName }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateSize();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      size_name: sizeName || "",
    },
  });
  const onSubmit: SubmitHandler<SizeSchemaType> = async (data) => {
    try {
      await mutateAsync({ sizeId: id, name: data.size_name });
      toast.success(Messages.SIZE_UPDATED);
      setOpen(false);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon-lg"
            className="group cursor-pointer rounded-lg bg-white! px-5 py-4! hover:bg-white"
          >
            <Pen className="size-5 text-black transition-all duration-300 group-hover:text-primary" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle className={"text-xl font-semibold"}>
              Edit food size
            </DialogTitle>

            <DialogDescription>
              Update the size details and price. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div>
            {FORM_INPUTS.map((input) => (
              <InputField
                key={input.id}
                input={input}
                register={register(input.name as keyof SizeSchemaType)}
                error={errors[
                  input.name as keyof SizeSchemaType
                ]?.message?.toString()}
              />
            ))}
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              }
            />

            <LoadingButton
              isLoading={isPending}
              disabled={isPending}
              type="submit"
              className="cursor-pointer min-w-29"
            >
              Save changes
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSize;
