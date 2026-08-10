import { Routes } from "@/constants";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={Routes.ROOT} className="flex flex-1">
      <img src={"/images/logo.png"} alt="Logo" className="w-14 h-fit" />
    </Link>
  );
};

export default Logo;
