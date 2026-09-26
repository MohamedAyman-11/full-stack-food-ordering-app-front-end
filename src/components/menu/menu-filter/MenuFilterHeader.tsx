import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
interface Props {
  onResetHandler: () => void;
}
const MenuFilterHeader = ({ onResetHandler }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ListFilter className="h-6 w-6 text-primary" />
        <h2 className="text-[16px] font-bold text-black">Filter</h2>
      </div>
      <Button
        onClick={onResetHandler}
        className="bg-transparent! cursor-pointer duration-300 transition-all hover:text-primary/90 text-sm font-semibold text-primary"
      >
        Clear all
      </Button>
    </div>
  );
};

export default MenuFilterHeader;
