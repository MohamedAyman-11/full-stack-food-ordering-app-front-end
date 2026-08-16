import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { Routes } from "@/constants";
import { Link } from "react-router-dom";
interface Props {
  page: string;
  LinkText: string;
  spanText: string;
}
const AuthFooter = ({ page, LinkText, spanText }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-full h-[1.5px] bg-[#ccc]"></div>
        <span className="text-accent font-semibold">OR</span>
        <div className="w-full h-[1.5px] bg-[#ccc]"></div>
      </div>
      <GoogleLoginButton />
      <div className="flex items-center gap-2 justify-center mt-4">
        <span className="block text-accent text-sm">{spanText}</span>
        <Link
          to={`/${Routes.AUTH}/${page}`}
          className="block text-primary text-sm duration-300 transition hover:text-[#d13505] "
        >
          {LinkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthFooter;
