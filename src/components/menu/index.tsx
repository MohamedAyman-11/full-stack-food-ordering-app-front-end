import Menu from "../ui/menu/Menu";
import useGetCategoriesWithProducts from "../../hooks/categories/useGetCategoriesWithProducts";
import type { CategoryWithProducts } from "@/interfaces";
import Loading from "./Loading";
import SectionWrapper from "../ui/SectionWrapper";

const MenuList = () => {
  const { data, isPending } = useGetCategoriesWithProducts();
  if (isPending) return <Loading />;
  return (
    <div>
      {data.categories.map((category: CategoryWithProducts) => (
        <SectionWrapper key={category.id}>
          <div className="text-center">
            <h2 className="text-primary font-bold text-5xl italic">
              {category.name}
            </h2>
          </div>
          <Menu products={category.products} />
        </SectionWrapper>
      ))}
    </div>
  );
};

export default MenuList;
