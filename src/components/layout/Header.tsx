import Logo from './Logo';
import Navbar from '../ui/Navbar';
import CartIcon from './CartIcon';

import UserMenu from './UserMenu';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import SearchInput from './SearchInput';
import { useState } from 'react';
import LoginButton from './LoginButton';
import LoadingSpinner from '../ui/LoadingSpinner';
import MobileNavbar from '../ui/MobileNavbar';

const Header = () => {
  const { data: user, isPending } = useGetCurrentUser();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="container">
        <div className="flex h-18 items-center gap-4">
          {/* Logo */}
          <div className="shrink-0 ">
            <Logo />
          </div>

          <div className="flex items-center gap-5 mx-auto">
            <Navbar />
            <div className="hidden md:block ">
              <SearchInput />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ">
            <MobileNavbar open={openMenu} setOpenMenu={setOpenMenu} />

            <CartIcon />

            {isPending ? (
              <div className="mx-5">
                <LoadingSpinner size="size-6" />
              </div>
            ) : user ? (
              <UserMenu />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <SearchInput />
        </div>
      </div>
    </header>
  );
};

export default Header;
