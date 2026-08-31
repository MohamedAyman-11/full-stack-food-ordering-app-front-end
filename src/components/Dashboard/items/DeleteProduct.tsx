import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import { Messages } from '@/constants';
import { axiosErrorHandler } from '@/lib/functions';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import useDeleteProduct from '@/hooks/products/useDeleteProduct';

interface Props {
  id: string;
}

const DeleteProduct = ({ id }: Props) => {
  const { isPending, mutateAsync } = useDeleteProduct();

  const [open, setOpen] = useState(false);

  const onDeleteHandler = async () => {
    try {
      await mutateAsync(id);
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
            variant={'destructive'}
            size="lg"
            className="
            cursor-pointer!
            inline-flex items-center justify-center gap-2 rounded-md border border-red-200! px-3 py-2
            text-sm font-medium text-red-600! transition-colors! hover:bg-red-50!
            "
          >
            <Trash className="size-5" />
            Delete
          </Button>
        }
      />

      <DialogContent className="overflow-hidden p-0 sm:max-w-106.25">
        <div className="p-6">
          <DialogHeader className="space-y-4">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold tracking-tight">Delete this product?</DialogTitle>

              <DialogDescription className="text-sm leading-6 text-muted-foreground">
                You&apos;re about to permanently delete this product. This action cannot be undone, and all associated
                data will be lost.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-6 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
            <p className="text-sm font-medium text-destructive">This action is permanent.</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Please make sure you want to continue before deleting this product.
            </p>
          </div>
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <DialogClose
            render={
              <Button variant="outline" type="button" className="cursor-pointer">
                Cancel
              </Button>
            }
          />

          <LoadingButton
            onClick={onDeleteHandler}
            disabled={isPending}
            isLoading={isPending}
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

export default DeleteProduct;
