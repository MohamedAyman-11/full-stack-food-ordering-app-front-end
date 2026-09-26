import { Pages, Routes } from '@/constants';
import { type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import RememberMe from '../RememberMe';
interface Props {
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
}
const AuthOptions = ({ remember, setRemember, isPending }: Props) => {
  return (
    <div className="flex items-center justify-between my-5">
      <RememberMe isPending={isPending} remember={remember} setRemember={setRemember} />

      <div>
        <Link
          to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
          className="block text-primary text-sm duration-300 transition hover:text-primary/80"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default AuthOptions;
