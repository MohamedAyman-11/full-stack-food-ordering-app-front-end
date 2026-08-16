import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { Extra } from "@/interfaces";
import { formatCurrency } from "@/lib/functions";
import type { Dispatch, SetStateAction } from "react";
interface Props {
  extras: Extra[];
  setSelectedExtras: Dispatch<SetStateAction<Extra[]>>;
  selectedExtras: Extra[] | undefined;
}
const Extras = ({ extras, selectedExtras, setSelectedExtras }: Props) => {
  const handleCheckbox = (extra: Extra) => {
    if (selectedExtras?.find((item) => item.extra.id === extra.extra.id)) {
      const filteredExtras = selectedExtras.filter(
        (item) => item.extra.id !== extra.extra.id,
      );
      setSelectedExtras(filteredExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return (
    <div>
      <h4 className="font-semibold text-center">Any extras?</h4>
      <FieldGroup className="w-full mt-3 gap-3">
        {extras.map((extra) => (
          <Field
            orientation="horizontal"
            key={extra.extra.id}
            className="flex extras-center gap-3 border w-full py-2 px-2 rounded-md cursor-pointer"
            onClick={() => handleCheckbox(extra)}
          >
            <Checkbox
              id={extra.extra.id}
              name={extra.extra.id}
              checked={Boolean(
                selectedExtras?.find(
                  (item) => item.extra.id === extra.extra.id,
                ),
              )}
            />
            <FieldLabel
              htmlFor={extra.extra.id}
              className="font-semibold text-accent flex-1 cursor-pointer"
            >
              {extra.extra.name} ({formatCurrency(Number(extra.price))})
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default Extras;
