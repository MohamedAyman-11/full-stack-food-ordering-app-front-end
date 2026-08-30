import UpdateCategoryForm from './UpdateCategoryForm';

const Index = () => {
  return (
    <div className="w-full  lg:pl-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Update Category</h3>
      </div>
      <UpdateCategoryForm />
    </div>
  );
};

export default Index;
