import Logo from "./Logo";
import Navbar from "../ui/Navbar";
import CartIcon from "./CartIcon";
import { useAppSelector } from "@/app/hooks";
import { getCartItems } from "@/app/features/cart/cart";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-4 border-b border-black/5 bg-white backdrop-blur-xl">
      <div className="container">
        <div className="flex  items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>
          <Navbar />
          {/* Actions */}
          <div className="flex items-center gap-3">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
