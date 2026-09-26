import { Routes } from '@/constants';
import { NavLink } from 'react-router-dom';

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
];

const Navbar = () => {
  return (
    <>
      <ul className={`p-0 static bg-white h-auto flex-row w-full lg:w-auto  items-center gap-10 hidden lg:flex`}>
        {NAVBAR_DATA.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              className={` block text-accent hover:text-primary transition-colors font-semibold text-lg`}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
