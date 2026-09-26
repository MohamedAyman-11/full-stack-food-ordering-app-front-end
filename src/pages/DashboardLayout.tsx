import { NavLink, Outlet } from 'react-router-dom';
import { ShieldLock, UserIcon } from 'lucide-react';
import { Pages, Routes } from '@/constants';

const PROFILE_NAV_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: 'Account Details',
    path: `/${Routes.PROFILE}/${Pages.ACCOUNT_DETAILS}`,
    icon: UserIcon,
  },
  {
    id: crypto.randomUUID(),
    title: 'Password',
    path: `/${Routes.PROFILE}/${Pages.PASSWORD}`,
    icon: ShieldLock,
  },
];

const DashboardLayout = () => {
  return (
    <div className="my-10">
      <div className="container w-full ">
        <ul className="flex flex-row items-center justify-center gap-2 flex-nowrap w-full mb-10">
          {PROFILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="w-fit">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `justify-center lg:justify-start whitespace-nowrap flex-nowrap mb-2 rounded-lg flex gap-2 items-center
                    transition-all duration-300 font-medium text-sm px-3 lg:px-6 py-2
                    ${isActive ? 'text-white bg-primary' : 'text-accent hover:text-white hover:bg-primary'}`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex-1 w-full lg:w-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
