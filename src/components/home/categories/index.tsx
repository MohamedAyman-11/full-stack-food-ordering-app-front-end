import MainHeading from "@/components/ui/MainHeading";
import CategoryList from "./CategoryList";

const Categories = () => {
  return (
    <section className="best-seller section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading subTitle="Explore" title="Categories" />
        </div>
        <CategoryList />
      </div>
    </section>
  );
};

export default Categories;
