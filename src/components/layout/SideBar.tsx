import { Pages, Routes } from '@/constants';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import {
  LayoutDashboard,
  type LucideIcon,
  PlusCircle,
  Ruler,
  ShieldLock,
  ShoppingCart,
  Tags,
  Truck,
  UserIcon,
  Users,
  Utensils,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
export type UserAction = {
  id: string;
  title: string;
  path: string;
  icon: LucideIcon;
};
const USER_PROFILE_NAV_ITEMS: UserAction[] = [
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
  {
    id: crypto.randomUUID(),
    title: 'Orders',
    path: `/${Routes.PROFILE}/${Pages.ORDERS}`,
    icon: ShoppingCart,
  },
];

const ADMIN_PROFILE_NAV_ITEMS: UserAction[] = [
  {
    id: crypto.randomUUID(),
    title: 'Account Details',
    path: `/${Routes.ADMIN}/${Pages.ACCOUNT_DETAILS}`,
    icon: UserIcon,
  },
  {
    id: crypto.randomUUID(),
    title: 'Password',
    path: `/${Routes.ADMIN}/${Pages.PASSWORD}`,
    icon: ShieldLock,
  },
  {
    id: crypto.randomUUID(),
    title: 'Dashboard',
    path: `/${Routes.ADMIN}/${Pages.DASHBOARD}`,
    icon: LayoutDashboard,
  },
  {
    id: crypto.randomUUID(),
    title: 'Categories',
    path: `/${Routes.ADMIN}/${Pages.CATEGORIES}`,
    icon: Tags,
  },
  {
    id: crypto.randomUUID(),
    title: 'Sizes',
    path: `/${Routes.ADMIN}/${Pages.SIZES}`,
    icon: Ruler,
  },
  {
    id: crypto.randomUUID(),
    title: 'Extras',
    path: `/${Routes.ADMIN}/${Pages.EXTRAS}`,
    icon: PlusCircle,
  },
  {
    id: crypto.randomUUID(),
    title: 'Items',
    path: `/${Routes.ADMIN}/${Pages.ITEMS}`,
    icon: Utensils,
  },
  {
    id: crypto.randomUUID(),
    title: 'Users',
    path: `/${Routes.ADMIN}/${Pages.CUSTOMERS}`,
    icon: Users,
  },
  {
    id: crypto.randomUUID(),
    title: 'Orders',
    path: `/${Routes.ADMIN}/${Pages.ORDERS}`,
    icon: ShoppingCart,
  },
];
const SideBar = () => {
  const { data: user } = useGetCurrentUser();
  return (
    <div className="lg:pr-8 lg:pt-0 pt-5 w-full lg:w-auto">
      <aside className="overflow-y-hidden overflow-x-auto">
        <ul className="pb-3 lg:pb-0 flex flex-row items-center lg:flex-col lg:items-start gap-2 flex-nowrap w-full ">
          {(user.role === 'CUSTOMER' ? USER_PROFILE_NAV_ITEMS : ADMIN_PROFILE_NAV_ITEMS).map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="w-full">
                <NavLink
                  to={item.path}
                  className={`justify-center lg:justify-start whitespace-nowrap flex-nowrap mb-2 rounded-lg flex  gap-2 items-center text-accent hover:text-primary hover:bg-primary/5 transition-colors font-medium text-sm px-3 lg:px-6 py-2`}
                >
                  <Icon className="h-5 w-5 " />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
