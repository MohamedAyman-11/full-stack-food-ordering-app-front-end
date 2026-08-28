import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DialogTrigger,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import { Messages } from "@/constants";
import useDeleteExtra from "@/hooks/extras/useDeleteExtra";
import { axiosErrorHandler } from "@/lib/functions";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
interface Props {
  id: string;
}
const DeleteExtra = ({ id }: Props) => {
  const { mutateAsync, isPending } = useDeleteExtra();

  const onDeleteExtraHandler = async () => {
    try {
      await mutateAsync(id);
      toast.success(Messages.EXTRA_DELETED);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size="icon-lg"
            className="group cursor-pointer rounded-lg bg-white! px-5 py-4! hover:bg-white"
          >
            <Trash className="size-5 text-black transition-all duration-300 group-hover:text-destructive" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-106.25 p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="space-y-4">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Delete this extra?
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-muted-foreground">
                You&apos;re about to permanently delete this extra. This action
                cannot be undone, and all associated data will be lost.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-6 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
            <p className="text-sm font-medium text-destructive">
              This action is permanent.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Please make sure you want to continue before deleting this extra.
            </p>
          </div>
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <DialogClose
            render={
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            }
          />
          <LoadingButton
            isLoading={isPending}
            disabled={isPending}
            onClick={onDeleteExtraHandler}
            variant="destructive"
            type="button"
            className="min-w-46 cursor-pointer"
          >
            <Trash className="mr-2 size-4" />
            Delete permanently
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExtra;
