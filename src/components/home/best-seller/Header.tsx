import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  item: any;
}
const Header = ({ item }: Props) => {
  return (
    <DialogHeader className="text-center mx-auto">
      <img src={item.image} alt="Photo" className="h-40 mx-auto" />
      <DialogTitle className="font-semibold text-xl my-3">
        {item.title}
      </DialogTitle>
      <DialogDescription className="text-gray-500 text-sm line-clamp-3 ">
        {item.description}
      </DialogDescription>
    </DialogHeader>
  );
};

export default Header;
