import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

interface QuantityProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const Quantity = ({ quantity, setQuantity }: QuantityProps) => {
  const increaseQuantity = () => setQuantity((prev) => prev! + 1);
  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev! - 1);
  };
  return (
    <div className="flex items-center flex-col gap-2 w-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Button
          variant="outline"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className={"cursor-pointer"}
        >
          <Minus className="size-4" />
        </Button>
        <div>
          <span className="text-black">{quantity}</span>
        </div>
        <Button
          variant="outline"
          onClick={increaseQuantity}
          className={"cursor-pointer"}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
