import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronDown, Settings, Shield, ShoppingCart } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Pages, Routes } from '@/constants';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const USER_MENU_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: 'Settings',
    path: `/${Routes.PROFILE}/${Pages.ACCOUNT_DETAILS}`,
    icon: Settings,
  },
  {
    id: crypto.randomUUID(),
    title: 'My Orders',
    path: `/${Pages.MY_ORDERS}`,
    icon: ShoppingCart,
  },
];

const ADMIN_MENU_ITEMS = [
  ...USER_MENU_ITEMS,
  {
    id: crypto.randomUUID(),
    title: 'Admin Panel',
    path: `/${Routes.ADMIN}/${Pages.ITEMS}`,
    icon: Shield,
  },
];

const UserMenu = () => {
  const { data: user } = useGetCurrentUser();

  if (!user) return null;

  const navItems = user.role === 'ADMIN' ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger
        className=" ml-4 flex h-9 items-center gap-1.5 rounded-full p-0.5 outline-none
         transition-colors hover:bg-muted/60 focus-visible:ring-2
          focus-visible:ring-primary/20 cursor-pointer
        "
      >
        <Avatar className={'h-7.5! w-7.5! '}>
          <AvatarImage src={user?.picture?.url} alt={'User Avatar'} className={'h-full w-ful'} />
          <AvatarFallback className={'bg-primary text-white font-semibold text-lg'}>
            {user?.firstName?.[0]?.toUpperCase()}
          </AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>

        <ChevronDown className="mr-1 size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className=" w-40 rounded-lg border border-border/50 bg-background p-1
         shadow-lg shadow-black/10
        "
      >
        {/* User info */}
        <div className="px-3 py-2.5">
          <p className="truncate text-sm font-semibold leading-5 text-primary mb-1.5">
            {user.firstName} {user.lastName}
          </p>

          <p className="truncate text-[13px] leading-4 text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="mx-0 my-1 bg-border/60" />

        {/* Navigation items */}
        <div className="space-y-2 p-0! py-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={item.id}
                className={`
                h-10
                rounded-md
                px-1
                py-2.5
                mx-0!
${
  item.title === 'Admin Panel'
    ? `
      mt-3
      border border-amber-200
      bg-gradient-to-r
      from-amber-50
      to-orange-50
      text-amber-700
      shadow-sm
      hover:from-amber-100
      hover:to-orange-100
      hover:text-amber-800
      transition-all
    `
    : `
      hover:bg-primary/8!
      hover:text-primary
    `
}
                `}
                render={
                  <Link
                    to={item.path}
                    className=" flex h-full w-full items-center gap-3 rounded-md px-3 
                    text-sm font-medium transition-colors
                  "
                  >
                    <Icon
                      className="
                      size-4.25
                      shrink-0
                      stroke-[1.8]
                    "
                    />
                    <span>{item.title}</span>
                  </Link>
                }
              />
            );
          })}
        </div>

        <DropdownMenuSeparator className="mx-0 my-1 bg-border/60" />

        {/* Logout */}
        <DropdownMenuItem
          variant="destructive"
          className="
            h-10
            rounded-md
            text-sm
            px-0
            font-medium
            py-2.5
            mb-1
          "
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
