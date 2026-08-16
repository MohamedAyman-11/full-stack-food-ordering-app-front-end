import type { Product } from "@/interfaces";
import MenuItem from "./MenuItem";

interface Props {
  products: Product[];
}
const Menu = ({ products }: Props) => {
  return (
    <div className="mt-7">
      <ul className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <MenuItem product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
