import useGetProducts from '@/hooks/products/useGetProducts';
import Loading from '../extras/Loading';
import EditCategory from '../categories/EditCategory';
import DeleteCategory from '../categories/DeleteCategory';
import DeleteProduct from './DeleteProduct';
type Product = {
  id: string;
  image: { url: string };
  name: string;
};
const ProductsList = () => {
  const { data: products, isPending } = useGetProducts();
  if (isPending) return <Loading />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 my-8">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <div key={product.id} className="group bg-gray-200 p-3 rounded-md relative">
            <img src={product.image.url} alt={product.name} className="w-60 h-60 mx-auto object-contain" />
            <div
              className="z-40 rounded-md transition-all duration-300 flex items-center
               bg-gray-100/50 justify-center
             w-full h-full absolute inset-1/2 transform -translate-1/2 gap-5 opacity-0 group-hover:opacity-100"
            >
              <EditCategory id={product.id} />
              <DeleteProduct id={product.id} />
            </div>
          </div>
        ))
      ) : (
        <h2>No products found</h2>
      )}
    </div>
  );
};

export default ProductsList;
