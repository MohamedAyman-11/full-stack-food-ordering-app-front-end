import { Routes } from "@/constants";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={Routes.ROOT}
      className="flex  text-primary uppercase font-bold items-center gap-2 text-2xl "
    >
      <img src={"/images/brand.png"} alt="Logo" className="w-30 h-fit" />
    </Link>
  );
};

export default Logo;
