import { DialogContent, DialogFooter } from "../dialog";
import Header from "@/components/home/best-seller/Header";
import ItemSizes from "@/components/ui/menu/ItemSizes";
import Extras from "@/components/ui/menu/Extras";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import Loading from "./Loading";
import { Button, buttonVariants } from "../button";
import { useAppDispatch } from "@/app/hooks";
import { addProductToCart, type CartItem } from "@/app/features/cart/cart";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { type Size, type Extra } from "../../../interfaces/index";
import { formatCurrency } from "@/lib/functions";
import Quantity from "./Quantity";
interface Props {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ModalContent = ({ id, open, setOpen }: Props) => {
  const { data, isLoading } = useGetProduct({ id, open });
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const extrasPrice = selectedExtras.reduce(
    (prev, cur) => Number(prev) + Number(cur.price),
    0,
  );

  useEffect(() => {
    if (!data) return;
    setSelectedSize(data.productSizes[0]);
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <DialogContent>Product not found</DialogContent>;
  }
  const addToCart = (item: CartItem) => {
    dispatch(
      addProductToCart({
        id: item.id,
        name: item.name,
        url: item.url,
        extras: selectedExtras,
        size: selectedSize,
        quantity,
        price: Number(item.price),
      }),
    );
    setOpen(false);
    setQuantity(1);
    setSelectedSize(data.productSizes[0]);
    setSelectedExtras([]);
  };
  return (
    <DialogContent className={"sm:max-w-106.25 max-h-[80vh] overflow-y-auto "}>
      <Header
        data={{
          url: data.image.url,
          name: data.name,
          description: data.description,
        }}
      />
      <ItemSizes
        sizes={data.productSizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <Extras
        extras={data.productExtras}
        selectedExtras={selectedExtras}
        setSelectedExtras={setSelectedExtras}
      />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <DialogFooter>
        <Button
          onClick={() => {
            addToCart({
              id: data.id,
              url: data.image.url,
              name: data.name,
              price: Number(data.price),
            });
          }}
          variant="outline"
          className={`${buttonVariants({ size: "lg" })} text-white! px-8! cursor-pointer! py-5 w-full`}
        >
          Add to cart (
          {formatCurrency(
            (Number(data.price) + extrasPrice + Number(selectedSize?.price)) *
              quantity,
          )}
          )
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalContent;
