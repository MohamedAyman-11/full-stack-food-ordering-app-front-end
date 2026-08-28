import Logo from "./Logo";
import Navbar from "../ui/Navbar";
import CartIcon from "./CartIcon";
import { useAppSelector } from "@/app/hooks";
import { getCartItems } from "@/app/features/cart/cart";
import LoginButton from "./LoginButton";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-4 border-b border-black/5 bg-white ">
      <div className="container">
        <div className="flex items-center lg:justify-between">
          {/* Logo */}
          <div className="shrink-0 flex-1 lg:flex-none">
            <Logo />
          </div>
          <Navbar />
          {/* Actions */}
          <div className="flex items-center gap-5">
            <AuthenticatedNavbar />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
