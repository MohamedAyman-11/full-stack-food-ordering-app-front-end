import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart } from 'lucide-react';

import ModalContent from '@/components/ui/menu/ModalContent';
import { useState } from 'react';
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
            className={`${buttonVariants({ size: 'lg' })} rounded-2xl!
             text-white! px-5! cursor-pointer! py-3`}
          />
        }
      >
        <ShoppingCart className="size-5 stroke-2" />
      </DialogTrigger>
      <ModalContent id={productId} open={open} setOpen={setOpen} />
    </Dialog>
  );
};

export default AddToCart;
