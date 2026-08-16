import { Pages, Routes } from "@/constants";
import { buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";
interface Props {
  setOpenMenu: (value: boolean) => void;
}
const LoginButton = ({ setOpenMenu }: Props) => {
  return (
    <Link
      to={`/${Routes.AUTH}/${Pages.LOGIN}`}
      onClick={() => setOpenMenu(false)}
      className={`${buttonVariants({ size: "lg" })} rounded-full! px-8! py-5.5! text-white! font-semibold text-xl`}
    >
      Login
    </Link>
  );
};

export default LoginButton;
