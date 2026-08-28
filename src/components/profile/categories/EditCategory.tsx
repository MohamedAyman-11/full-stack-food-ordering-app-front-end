import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants";
import { Pen } from "lucide-react";
import { Link } from "react-router-dom";
interface Props {
  id: string;
}
const EditCategory = ({ id }: Props) => {
  return (
    <Link
      to={`/${Routes.ADMIN}/${Pages.CATEGORIES}/${id}`}
      className={`${buttonVariants({ size: "lg" })} cursor-pointer! bg-blue-500! hover:bg-blue-500/90! w-12! py-4! text-white!`}
    >
      <Pen className="size-5" />
    </Link>
  );
};

export default EditCategory;
