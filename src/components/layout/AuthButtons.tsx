import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Pages, Routes } from "@/constants";

const AuthButtons = () => {
  return (
    <div className="flex items-start lg:items-center gap-3 flex-col lg:flex-row lg:ml-5">
      <Link
        to={`/${Routes.AUTH}/${Pages.LOGIN}`}
        className={`${buttonVariants({ size: "lg", variant: "outline" })} font-semibold!
         duration-500 transition-all text-primary cursor-pointer border-2! border-primary!
          hover:bg-primary hover:text-white rounded-md! px-8! py-4! text-lg!`}
      >
        Login
      </Link>
      <Link
        to={`/${Routes.AUTH}/${Pages.REGISTER}`}
        className={`${buttonVariants({ size: "lg" })} font-semibold! duration-500 transition-all 
        cursor-pointer rounded-md! px-8! py-4! text-white! border-2! border-primary!
         hover:bg-transparent hover:text-primary! text-lg!`}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
