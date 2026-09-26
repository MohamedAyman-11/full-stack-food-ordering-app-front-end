import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import Header from '@/components/home/best-seller/Header';
import ItemSizes from '@/components/ui/menu/ItemSizes';
import Extras from '@/components/ui/menu/Extras';
import Quantity from './Quantity';

import { useAppDispatch } from '@/app/hooks';

import type { Extra, Product, Size } from '@/interfaces';
import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';
import { addProductToCart } from '@/app/features/cart/cart';

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size>(product.productSizes[0]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);

  const extrasPrice = selectedExtras.reduce((total, extra) => total + Number(extra.price), 0);

  const price = (extrasPrice + getPriceAfterDiscount(Number(selectedSize.price), Number(product.discount))) * quantity;

  const addToCart = () => {
    dispatch(
      addProductToCart({
        id: product.id,
        name: product.name,
        url: product.image.url,
        extras: selectedExtras,
        size: selectedSize,
        quantity,
        price,
        discount: Number(product.discount) ?? 0,
      }),
    );

    setOpen(false);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setQuantity(1);
      setSelectedSize(product.productSizes[0]);
      setSelectedExtras([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className={`${buttonVariants({ size: 'lg' })} w-full rounded-2xl! text-white! px-5! py-3 `}
          >
            Add to Cart <ShoppingCart className="size-5 stroke-2" />
          </Button>
        }
      />
      <DialogContent className={'sm:max-w-md max-h-[80vh] overflow-y-auto '}>
        <Header data={{ url: product.image.url, name: product.name, description: product.description }} />
        <ItemSizes
          discount={Number(product.discount) ?? 0}
          sizes={product.productSizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <Extras extras={product.productExtras} selectedExtras={selectedExtras} setSelectedExtras={setSelectedExtras} />
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <DialogFooter>
          <Button
            onClick={addToCart}
            variant="outline"
            className={`${buttonVariants({ size: 'lg' })} text-white! px-8! cursor-pointer! py-5 w-full`}
          >
            Add to cart ({formatCurrency(price)})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCart;
