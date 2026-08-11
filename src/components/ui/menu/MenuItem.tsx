import AddToChart from "@/components/home/best-seller/AddToChart";
import { formatCurrency } from "@/lib/functions";

interface Props {
  item: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    image: string;
    title: string;
    description: string;
    price: number;
  };
}
const MenuItem = ({ item }: Props) => {
  return (
    <li
      className="p-6 rounded-lg text-center
    group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="relative w-48 h-48 mx-auto">
        <img src={item.image} className="object-cover" alt={item.title} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{item.title}</h4>
        <strong className="text-accent">{formatCurrency(item.price)}</strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3 mb-6">
        {item.description}
      </p>
      <AddToChart item={item} />
    </li>
  );
};

export default MenuItem;
