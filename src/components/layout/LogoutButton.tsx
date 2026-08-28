import { Messages, Pages, Routes } from "@/constants";
import { buttonVariants } from "../ui/button";
import toast from "../../../node_modules/react-hot-toast/src/index";
import { axiosErrorHandler } from "@/lib/functions";
import useLogout from "@/hooks/auth/useLogout";
import LoadingButton from "../ui/LoadingButton";
interface Props {
  setOpenMenu: (value: boolean) => void;
}
const LogoutButton = ({ setOpenMenu }: Props) => {
  const { mutateAsync, isPending } = useLogout();
  const onLogoutHandler = async () => {
    try {
      await mutateAsync();
      setOpenMenu(false);
      toast.success(Messages.LOGOUT_SUCCESSFULLY);
      location.replace(`/${Routes.AUTH}/${Pages.LOGIN}`);
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };
  return (
    <LoadingButton
      isLoading={isPending}
      disabled={isPending}
      onClick={onLogoutHandler}
      className={`${buttonVariants({ size: "lg" })} cursor-pointer rounded-md! px-6! py-4! text-white! font-semibold text-lg transition-all duration-500 border-2! border-primary! hover:bg-transparent hover:text-primary! min-w-28.25 `}
    >
      Logout
    </LoadingButton>
  );
};

export default LogoutButton;
