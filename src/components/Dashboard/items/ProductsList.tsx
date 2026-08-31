import useGetProducts from '@/hooks/products/useGetProducts';
import Loading from '../extras/Loading';
import Item from './Item';

type Item = {
  id: string;
  name: string;
  price: string;
  image: { url: string };
  isAvailable: boolean;
  discount: string;
};

const ProductsList = () => {
  const { data: products, isPending } = useGetProducts();
  if (isPending) return <Loading />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 my-8">
      {products.length > 0 ? (
        products.map((product: Item) => <Item item={product} key={product.id} />)
      ) : (
        <h2>No products found</h2>
      )}
    </div>
  );
};

export default ProductsList;
