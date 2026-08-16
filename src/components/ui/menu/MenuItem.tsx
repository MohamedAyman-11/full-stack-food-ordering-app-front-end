import AddToChart from "@/components/ui/menu/AddToChart";
import type { Product } from "@/interfaces";
import { formatCurrency } from "@/lib/functions";

interface Props {
  product: Product;
}
const MenuItem = ({ product }: Props) => {
  return (
    <li
      className="p-6 rounded-lg text-center
    group hover:bg-white shadow-md hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="relative w-48 h-48 mx-auto">
        <img
          src={product.image.url}
          className="object-cover"
          alt={product.name}
        />
      </div>
      <div className="flex products-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{product.name}</h4>
        <strong className="text-accent">{formatCurrency(product.price)}</strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3 mb-6">
        {product.description}
      </p>
      <AddToChart productId={product.id} />
    </li>
  );
};

export default MenuItem;
