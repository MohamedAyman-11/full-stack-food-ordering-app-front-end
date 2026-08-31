import { Pencil, Trash2, Circle } from 'lucide-react';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';

type Item = {
  id: string;
  name: string;
  price: string;
  image: { url: string };
  isAvailable: boolean;
  discount: string;
};

type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="relative overflow-hidden bg-gray-100 m-3 p-2 rounded-xl">
        <div className="w-60 mx-auto h-65">
          <img
            src={item.image.url}
            alt={item.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
            item.isAvailable ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          <Circle className={`h-2 w-2 ${item.isAvailable ? 'fill-green-600' : 'fill-red-600'}`} />

          {item.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="p-4 mt-4">
        <h3 className="truncate text-xl font-bold text-gray-900">{item.name}</h3>

        {item.discount ? (
          <div className="flex items-center gap-3 my-2">
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(getPriceAfterDiscount(+item.price, +item.discount))}
            </p>
            <p className="text-sm font-normal text-accent line-through">{formatCurrency(+item.price)}</p>
          </div>
        ) : (
          <p className="text-lg font-semibold text-primary">{formatCurrency(+item.price)}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <EditProduct id={item.id} />
          <DeleteProduct id={item.id} />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
