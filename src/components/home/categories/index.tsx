import MainHeading from "@/components/ui/MainHeading";
import CategoryList from "./CategoryList";
import SectionWrapper from "@/components/ui/SectionWrapper";

const Categories = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <MainHeading subTitle="Explore" title="Categories" />
      </div>
      <CategoryList />
    </SectionWrapper>
  );
};

export default Categories;
