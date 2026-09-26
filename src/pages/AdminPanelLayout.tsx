import { NavLink, Outlet } from 'react-router-dom';
import SideBar from '@/components/layout/SideBar';
import { Pages, Routes } from '@/constants';
import { Tags, Ruler, PlusCircle, Utensils, Users, ShoppingCart, Truck, Shield, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Header from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';

const ADMIN_PANEL_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: 'Items',
    path: `/${Routes.ADMIN}/${Pages.ITEMS}`,
    icon: Utensils,
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
    title: 'Users',
    path: `/${Routes.ADMIN}/${Pages.CUSTOMERS}`,
    icon: Users,
  },
  {
    id: crypto.randomUUID(),
    title: 'Delivery Partners',
    path: `/${Routes.ADMIN}/${Pages.DELIVERY_PARTNERS}`,
    icon: Truck,
  },
  {
    id: crypto.randomUUID(),
    title: 'Orders',
    path: `/${Routes.ADMIN}/${Pages.ORDERS}`,
    icon: ShoppingCart,
  },
];

const AdminPanelLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <Header />
      <div className="my-10 container flex items-center lg:items-start gap-5 flex-col lg:flex-row w-full ">
        <SideBar items={ADMIN_PANEL_ITEMS} />
        <div className="lg:hidden flex items-center justify-between w-full bg-card border-border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-2xl">
          <div className="text-center flex items-center justify-center gap-1 text-primary">
            <Shield />
            <h3 className="text-lg font-semibold ">Admin Panel</h3>
          </div>
          <AdminPanelDrawer open={openMenu} setOpenMenu={setOpenMenu} />
        </div>
        <Outlet />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: 500,
            maxWidth: 'fit-content',
            width: '100%',
          },
        }}
      />
    </div>
  );
};

export default AdminPanelLayout;

interface Props {
  open: boolean;
  setOpenMenu: (val: boolean) => void;
}

const AdminPanelDrawer = ({ open, setOpenMenu }: Props) => {
  return (
    <Drawer open={open} onOpenChange={setOpenMenu} swipeDirection="left">
      <DrawerTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="cursor-pointer rounded-xl text-accent transition-all duration-200
               hover:bg-accent/5 hover:text-primary active:scale-95
          "
          >
            <Menu className="size-6 stroke-[2.2]" />
            <span className="sr-only">Open Admin Panel menu</span>
          </Button>
        }
      />
      <DrawerContent className={'max-w-75'}>
        <DrawerHeader className="relative">
          <DrawerTitle className={'border-b border-border pb-5'}>
            <div className="text-start flex items-center  gap-1 text-primary">
              <Shield />
              <h3 className="text-lg font-semibold ">Admin Panel</h3>
            </div>
          </DrawerTitle>

          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 absolute right-4 top-4 cursor-pointer text-muted-foreground transition-all duration-300
                   hover:bg-black/5 hover:text-accent active:scale-90"
              >
                <X className="size-5" />
                <span className="sr-only">Close Admin Panel menu</span>
              </Button>
            }
          />
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <ul
            className="pb-3 lg:pb-0 flex  flex-col items-start justify-start
            gap-2 flex-nowrap w-full "
          >
            {ADMIN_PANEL_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="w-full" onClick={() => setOpenMenu(false)}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `justify-start whitespace-nowrap flex-nowrap mb-2 rounded-lg flex gap-2 items-center
                              transition-all duration-300 font-medium text-sm px-3 lg:px-6 py-2
                              ${isActive ? 'text-white bg-primary' : 'text-accent hover:text-white hover:bg-primary'}`
                    }
                  >
                    <Icon className="h-5 w-5 " />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
