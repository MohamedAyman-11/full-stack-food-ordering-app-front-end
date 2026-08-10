import { Routes } from "@/constants";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={Routes.ROOT}
      className="flex flex-1 text-primary uppercase font-bold items-center gap-2 text-2xl"
    >
      <img src={"/images/logo.png"} alt="Logo" className="w-14 h-fit" />
      PIZZA
    </Link>
  );
};

export default Logo;
