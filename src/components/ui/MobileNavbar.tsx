import { House, Menu, MoveRight, Utensils, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from '../ui/drawer';

import { Button } from './button';
import { Routes } from '@/constants';

const NAVBAR_DATA = [
  {
    id: 'home',
    title: 'Home',
    path: Routes.ROOT,
    icon: House,
  },
  {
    id: 'menu',
    title: 'Menu',
    path: `/${Routes.MENU}`,
    icon: Utensils,
  },
];

interface MobileNavbarProps {
  setOpenMenu: (value: boolean) => void;
  open: boolean;
}

const MobileNavbar = ({ setOpenMenu, open }: MobileNavbarProps) => {
  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpenMenu} swipeDirection="left">
        {/* Menu Button */}
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
              <span className="sr-only">Open menu</span>
            </Button>
          }
        />

        {/* Drawer */}
        <DrawerContent className="w-[85%] max-w-sm border-l border-black/5 bg-white p-0 shadow-2xl">
          {/* Header */}
          <DrawerHeader className="flex h-16 items-center justify-between border-b border-black/5 px-5 py-0 flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Menu</span>
            </div>

            <DrawerClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 cursor-pointer text-muted-foreground transition-all duration-300
                   hover:bg-black/5 hover:text-accent active:scale-90"
                >
                  <X className="size-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              }
            />
          </DrawerHeader>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav>
              <ul className="flex w-full flex-col gap-1.5">
                {NAVBAR_DATA.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        onClick={() => setOpenMenu(false)}
                        className={({ isActive }) =>
                          `group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold
                         transition-all duration-200
                        ${
                          isActive
                            ? `bg-primary/10 text-primary`
                            : ` text-accent hover:bg-black/[0.035] hover:text-primary`
                        }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full
                                 bg-primary transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}
                          `}
                            />

                            <span
                              className={` flex size-9 shrink-0 items-center justify-center rounded-lg 
                                transition-all duration-200

                            ${
                              isActive
                                ? 'bg-primary text-white'
                                : `
                                  bg-black/[0.035]
                                  text-muted-foreground
                                  group-hover:bg-primary/10
                                  group-hover:text-primary
                                `
                            }
                          `}
                            >
                              <Icon className="size-4.5 stroke-[2.2]" />
                            </span>

                            <span className="flex-1">{item.title}</span>

                            <MoveRight
                              className={` transition-all duration-200 size-4
                            ${
                              isActive
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                            }
                          `}
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="border-t border-black/5 px-5 py-4">
            <p className="text-center text-xs text-muted-foreground">Delicious food, delivered to your door.</p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
