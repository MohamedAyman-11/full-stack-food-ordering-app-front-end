import { Routes } from '@/constants';
import { NavLink } from 'react-router-dom';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import LogoutButton from '../layout/LogoutButton';
import AuthButtons from '../layout/AuthButtons';

const NAVBAR_DATA = [
  {
    id: crypto.randomUUID(),
    title: 'Home',
    path: Routes.ROOT,
  },
  {
    id: crypto.randomUUID(),
    title: 'Menu',
    path: `/${Routes.MENU}`,
  },
  {
    id: crypto.randomUUID(),
    title: 'About',
    path: `/${Routes.ABOUT}`,
  },
  {
    id: crypto.randomUUID(),
    title: 'Contact',
    path: `/${Routes.CONTACT}`,
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: user } = useGetCurrentUser();
  return (
    <>
      <Button variant="secondary" size="lg" className="lg:hidden cursor-pointer" onClick={() => setOpenMenu(true)}>
        <Menu className="w-6! h-6!" />
      </Button>
      <ul
        className={`lg:p-0 bg-white fixed lg:static ${
          openMenu ? 'left-0 z-55' : '-left-full'
        } top-0 px-10 py-20  bg-background lg:bg-transparent transition-all
         duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        {openMenu && (
          <Button
            variant="secondary"
            size="lg"
            className="lg:hidden z-60 cursor-pointer absolute top-10 right-10"
            onClick={() => setOpenMenu(false)}
          >
            <X className="w-6! h-6!" />
          </Button>
        )}
        {NAVBAR_DATA.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              onClick={() => setOpenMenu(false)}
              className={` block  text-accent hover:text-primary transition-colors font-semibold text-lg`}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
        <li>{user ? <LogoutButton setOpenMenu={setOpenMenu} /> : <AuthButtons />}</li>
      </ul>
    </>
  );
};

export default Navbar;
