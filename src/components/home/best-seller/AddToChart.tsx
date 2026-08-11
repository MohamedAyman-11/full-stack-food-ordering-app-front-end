import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import Header from "./Header";
import ItemSizes from "./ItemSizes";
import Extras from "./Extras";
interface Props {
  item: any;
}
const AddToCart = ({ item }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={`${buttonVariants({ size: "lg" })} rounded-full! text-white! px-8! cursor-pointer! py-5`}
          />
        }
      >
        Add To Cart <ShoppingCart className="size-4.5" />
      </DialogTrigger>
      <DialogContent
        className={"sm:max-w-106.25 max-h-[80vh] overflow-y-auto "}
      >
        <Header item={item} />
        <ItemSizes />
        <Extras />
        <DialogFooter>
          <Button className="w-full h-10">Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCart;
