import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import { Pages, Routes } from '@/constants';

const LoginButton = () => {
  return (
    <Link
      to={`/${Routes.AUTH}/${Pages.LOGIN}`}
      className={`${buttonVariants({ size: 'lg', variant: 'default' })} ml-3 rounded-full! duration-300 
      transition-all cursor-pointer px-6! md:px-7! h-10! py-3! text-base font-semibold`}
    >
      Sign in
    </Link>
  );
};

export default LoginButton;
