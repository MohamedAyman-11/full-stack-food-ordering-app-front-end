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
import useUpdateExtra from "@/hooks/extras/useUpdateExtra";
import useUpdateSize from "@/hooks/sizes/useUpdateSize";
import type { InputType } from "@/interfaces";
import { axiosErrorHandler } from "@/lib/functions";
import { extraSchema, type ExtraSchemaType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  id: string;
  extraName: string;
}

const FORM_INPUTS: InputType[] = [
  {
    id: crypto.randomUUID(),
    label: "Extra name",
    name: "extra_name",
    placeholder: "e.g. Extra cheese",
    type: "text",
  },
];

const EditExtra = ({ id, extraName }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateExtra();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(extraSchema),
    defaultValues: {
      extra_name: extraName || "",
    },
  });

  const onSubmit: SubmitHandler<ExtraSchemaType> = async (data) => {
    try {
      await mutateAsync({
        extraId: id,
        name: data.extra_name,
      });

      toast.success(Messages.EXTRA_UPDATED);
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
            <DialogTitle className="text-xl font-semibold">
              Edit food extra
            </DialogTitle>

            <DialogDescription>
              Update the name of this food extra. Make sure the name clearly
              describes the additional item.
            </DialogDescription>
          </DialogHeader>

          <div>
            {FORM_INPUTS.map((input) => (
              <InputField
                key={input.id}
                input={input}
                register={register(input.name as keyof ExtraSchemaType)}
                error={errors[
                  input.name as keyof ExtraSchemaType
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
              className="min-w-29 cursor-pointer"
            >
              Save changes
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExtra;
