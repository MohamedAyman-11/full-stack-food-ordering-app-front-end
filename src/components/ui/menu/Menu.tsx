import type { Product } from '@/interfaces';
import ProductCard from '@/components/menu/ProductCard';

interface Props {
  products: Product[];
}
const Menu = ({ products }: Props) => {
  return (
    <div className="mt-7">
      {products.length > 0 ? (
        <ul className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      ) : (
        <h2 className="text-center">No Products found </h2>
      )}
    </div>
  );
};

export default Menu;
