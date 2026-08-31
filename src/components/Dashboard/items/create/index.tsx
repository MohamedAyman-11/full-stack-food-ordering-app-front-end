import ProductForm from './ProductForm';

const index = () => {
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Create new product</h3>
      </div>
      <ProductForm />
    </div>
  );
};

export default index;
