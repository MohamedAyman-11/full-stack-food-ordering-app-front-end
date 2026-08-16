import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";

import ModalContent from "@/components/ui/menu/ModalContent";
import { useState } from "react";
interface Props {
  productId: string;
}
const AddToCart = ({ productId }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <ModalContent id={productId} open={open} setOpen={setOpen} />
    </Dialog>
  );
};

export default AddToCart;
