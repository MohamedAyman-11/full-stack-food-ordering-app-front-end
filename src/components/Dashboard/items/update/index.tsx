import UpdateProductForm from './UpdateProductForm';

const index = () => {
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Update Product</h3>
      </div>
      <UpdateProductForm />
    </div>
  );
};

export default index;
