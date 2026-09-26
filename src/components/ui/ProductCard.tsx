import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';
import AddToChart from '@/components/ui/menu/AddToChart';
import type { Product } from '@/interfaces';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative m-2 overflow-hidden rounded-xl bg-gray-100">
        <div className="aspect-4/3 w-full">
          <img src={product.image.url} alt={product.name} className="h-full w-full object-contain " />
        </div>

        {product.discount && +product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-xl font-bold text-gray-900">{product.name}</h3>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">{product.description}</p>

        {/* Price */}
        <div className="mt-3 min-h-8">
          {product.discount && +product.discount > 0 ? (
            <div className="flex items-center gap-3">
              <p className="text-lg font-semibold text-primary">
                {formatCurrency(getPriceAfterDiscount(+product.price, +product.discount))}
              </p>

              <p className="text-sm font-normal text-accent line-through">{formatCurrency(+product.price)}</p>
            </div>
          ) : (
            <p className="text-lg font-semibold text-primary">{formatCurrency(+product.price)}</p>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">
          <AddToChart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
