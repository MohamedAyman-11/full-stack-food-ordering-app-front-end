import { CheckoutInputs } from "@/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import { formatCurrency } from "@/lib/functions";
import { useAppSelector } from "@/app/hooks";
import { getCartItems } from "@/app/features/cart/cart";
import { DELIVERY_FEE, getSubtotal } from "@/lib/cart";

const CheckoutForm = () => {
  const cart = useAppSelector(getCartItems);
  const total = getSubtotal(cart) + DELIVERY_FEE;
  return (
    <form className="space-y-4 mt-4">
      {CheckoutInputs.map((item) => (
        <div key={item.id}>
          <Label htmlFor={item.id} className="mb-2 text-accent">
            {item.label}
          </Label>
          <Input
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            id={item.id}
            min={1}
          />
        </div>
      ))}
      <Button
        variant="outline"
        className={`${buttonVariants({ size: "lg" })} text-white! px-8! cursor-pointer! py-5 w-full`}
      >
        Pay ({formatCurrency(total)})
      </Button>
    </form>
  );
};

export default CheckoutForm;
