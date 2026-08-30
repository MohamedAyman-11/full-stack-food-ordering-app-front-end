import { Trash2, AlertTriangle, ShieldAlert } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/ui/LoadingButton';
import type { User } from '@/interfaces';
import useDeleteUser from '@/hooks/admin/useDeleteUser';
import toast from 'react-hot-toast';
import { axiosErrorHandler } from '@/lib/functions';
import { Messages } from '@/constants';

interface Props {
  user: User;
}

const DeleteUser = ({ user }: Props) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const { mutateAsync, isPending } = useDeleteUser();
  const onDelete = async () => {
    try {
      await mutateAsync(user.id);
      toast.success(Messages.ADMIN_USER_DELETED);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant={'destructive'} size={'sm'} className={'cursor-pointer'}>
            <Trash2 />
          </Button>
        }
      />
      <DialogContent className="overflow-hidden p-0 sm:max-w-120">
        {/* Header */}
        <div className="border-b bg-destructive/3 px-6 py-6">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 ring-1 ring-destructive/20">
                <ShieldAlert className="size-5 text-destructive" />
              </div>

              <div className="space-y-1.5">
                <DialogTitle className="text-xl font-semibold tracking-tight">Delete user?</DialogTitle>

                <DialogDescription className="text-sm leading-6">
                  You&apos;re about to permanently remove this user from your dashboard.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* User */}
        <div className="px-6 pt-2">
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img src={user.picture.url} alt="user picture" className="size-12 rounded-full" />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-medium">{fullName}</p>
                <p className="text-xs text-muted-foreground">User account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="px-6 py-2">
          <div className="rounded-xl border border-destructive/20 bg-destructive/4 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />

              <div className="space-y-1">
                <p className="text-sm font-semibold text-destructive">This action cannot be undone</p>

                <p className="text-xs leading-5 text-muted-foreground">
                  All data associated with <span className="font-medium text-foreground">{fullName}</span> will be
                  permanently removed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t bg-muted/20 px-6 py-4">
          <DialogClose
            render={
              <Button variant="outline" type="button" className="cursor-pointer">
                Cancel
              </Button>
            }
          />

          <LoadingButton
            onClick={onDelete}
            disabled={isPending}
            isLoading={isPending}
            variant="destructive"
            type="button"
            className="min-w-37.5 cursor-pointer"
          >
            <Trash2 className="mr-2 size-4" />
            Delete permanently
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
