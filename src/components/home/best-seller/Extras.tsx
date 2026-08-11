import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { formatCurrency } from "@/lib/functions";
const EXTRAS = [
  { id: crypto.randomUUID(), title: "Onion", value: "onion", price: 4 },
  { id: crypto.randomUUID(), title: "Cheese", value: "cheese", price: 8 },
  { id: crypto.randomUUID(), title: "Tomato", value: "tomato", price: 12 },
];
const Extras = () => {
  return (
    <div>
      <h4 className="font-semibold text-start">Any extras?</h4>
      <FieldGroup className="w-full mt-3">
        {EXTRAS.map((extra) => (
          <Field
            orientation="horizontal"
            key={extra.id}
            className="flex extras-center gap-3 border w-full py-2 px-2 rounded-md"
          >
            <Checkbox id={extra.value} name={extra.value} />
            <FieldLabel
              htmlFor={extra.value}
              className="font-semibold text-accent flex-1"
            >
              {extra.title} ({formatCurrency(extra.price)})
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default Extras;
