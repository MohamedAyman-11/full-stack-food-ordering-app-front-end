import { Minus, Plus, Trash2, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
  type CartItem as CartItemType,
} from '@/app/features/cart/cart';
import { formatCurrency, getPriceAfterDiscount } from '@/lib/functions';
import { useAppDispatch } from '@/app/hooks';
import { getItemTotalPrice } from '@/lib/cart';

interface CartItemProps {
  product: CartItemType;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const onRemove = () => {
    dispatch(removeItemFromCart(product));
  };

  const onDecrease = () => {
    dispatch(decreaseQuantity(product));
  };

  const onIncrease = () => {
    dispatch(increaseQuantity(product));
  };

  return (
    <div className="pt-5">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative w-34 h-24 shrink-0 overflow-hidden rounded-xl mx-auto md:mx-0">
          <img src={product.url} alt={product.name} className="object-contain w-full h-full rounded-xl!" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
            </div>

            <p className="shrink-0 text-base font-bold text-primary">{formatCurrency(getItemTotalPrice(product))}</p>
          </div>
          {product.size && (
            <div className="w-full my-2 ">
              <p className="text-sm text-gray-600">Size:</p>
              <div className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-orange-500" />
                <span className="text-gray-700">
                  {product.size.size.name}{' '}
                  <span className="text-gray-500">
                    ({formatCurrency(getPriceAfterDiscount(Number(product.size.price), product.discount))})
                  </span>
                  {product.discount > 0 && (
                    <span className="ml-1.5 text-sm text-gray-400 line-through">
                      {formatCurrency(Number(product.size.price))}
                    </span>
                  )}
                </span>
              </div>
            </div>
          )}
          {product.extras && product.extras.length > 0 && (
            <div className="mt-2">
              <p className="mb-1 text-sm text-gray-600">Extras:</p>

              <div className="space-y-1">
                {product.extras.map((extra) => (
                  <div key={extra.extra.id} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-orange-500" />

                    <span className="text-gray-700">
                      {extra.extra.name} ({formatCurrency(Number(extra.price))})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-end gap-2">
            {/* Quantity */}
            <div className="flex items-center overflow-hidden rounded-lg border bg-white">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-none cursor-pointer"
                onClick={onDecrease}
                disabled={product.quantity! <= 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="flex h-8 w-8 items-center justify-center border-x text-sm font-medium">
                {product.quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-none cursor-pointer"
                onClick={onIncrease}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Remove */}
            <Button type="button" variant="destructive" size="icon" onClick={onRemove}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
