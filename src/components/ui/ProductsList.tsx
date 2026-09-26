import type { Product } from '@/interfaces';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}
const ProductsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
