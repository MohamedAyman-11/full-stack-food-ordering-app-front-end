import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';
import AddToChart from '@/components/ui/menu/AddToChart';
type Product = {
  id: string;
  name: string;
  price: string;
  image: { url: string };
  isAvailable: boolean;
  discount: string;
  description: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative  bg-gray-100 m-3 p-2 rounded-xl overflow-hidden">
        <div className="w-60 mx-auto h-65">
          <img
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {product.discount && +product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#f0441c] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="truncate text-xl font-bold text-gray-900">{product.name}</h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {product.discount ? (
              <div className="flex items-center gap-3 my-2">
                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(getPriceAfterDiscount(+product.price, +product.discount))}
                </p>
                <p className="text-sm font-normal text-accent line-through">{formatCurrency(+product.price)}</p>
              </div>
            ) : (
              <p className="text-lg font-semibold text-primary">{formatCurrency(+product.price)}</p>
            )}
          </div>

          <AddToChart productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
