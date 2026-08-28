import { Pages, Routes } from '@/constants';
import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';
import { CircleUser, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar';

const AuthenticatedNavbar = () => {
  const { data: user } = useGetCurrentUser();
  return user ? (
    <Link
      to={`/${user.role === 'ADMIN' ? Routes.ADMIN : Routes.PROFILE}/${Pages.ACCOUNT_DETAILS}`}
      className="w-10 h-10 rounded-full overflow-hidden ml-5 flex items-center justify-center"
    >
      <Avatar>
        <AvatarImage src={user?.picture?.url} alt={'User Avatar'} className={'w-full h-full'} />
        <AvatarFallback className={'bg-primary text-white font-semibold'}>
          {user?.firstName?.[0]?.toUpperCase()}
          {user?.lastName?.[0]?.toUpperCase()}
        </AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
    </Link>
  ) : null;
};

export default AuthenticatedNavbar;
