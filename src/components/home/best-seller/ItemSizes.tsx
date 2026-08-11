import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/functions";
const SIZES = [
  { id: crypto.randomUUID(), title: "Small", value: "small", price: 4 },
  { id: crypto.randomUUID(), title: "Medium", value: "medium", price: 8 },
  { id: crypto.randomUUID(), title: "Large", value: "large", price: 12 },
];
const ItemSizes = () => {
  return (
    <>
      <div>
        <h4 className="font-semibold text-start">Pick your size</h4>
        <RadioGroup
          aria-label="Density"
          defaultValue="comfortable"
          className="w-full mt-3"
        >
          {SIZES.map((size) => (
            <div
              className="flex items-center gap-3 border w-full py-2 px-2 rounded-md"
              key={size.id}
            >
              <RadioGroupItem value={size.value} id={size.value} />
              <Label
                htmlFor={size.value}
                className="font-semibold text-accent flex-1"
              >
                {size.title} ({formatCurrency(size.price)})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default ItemSizes;
