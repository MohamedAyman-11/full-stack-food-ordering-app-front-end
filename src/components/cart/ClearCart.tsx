import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/app/hooks";
import { removeCart } from "@/app/features/cart/cart";

const ClearCart = () => {
  const dispatch = useAppDispatch();
  const onRemoveCart = () => dispatch(removeCart());
  return (
    <Button
      onClick={onRemoveCart}
      type="button"
      variant={"outline"}
      className={"text-red-500 border-border hover:text-red-500 cursor-pointer"}
    >
      <Trash />
      Clear cart
    </Button>
  );
};

export default ClearCart;
