import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/interfaces";

interface Props {
  data: {
    url: string;
    name: string;
    description: string;
  };
}
const Header = ({ data }: Props) => {
  return (
    <DialogHeader className="text-center mx-auto">
      <img src={data.url} alt="Photo" className="h-40 mx-auto" />
      <DialogTitle className="font-semibold text-xl my-3">
        {data.name}
      </DialogTitle>
      <DialogDescription className="text-gray-500 text-sm line-clamp-3 ">
        {data.description}
      </DialogDescription>
    </DialogHeader>
  );
};

export default Header;
