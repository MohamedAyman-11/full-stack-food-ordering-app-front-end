import type { Category } from "@/interfaces";

interface Props {
  category: Category;
}
const CategoryItem = ({ category }: Props) => {
  return (
    <div className="select-none flex items-center flex-col py-2 px-4 justify-between rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] ">
      <img src={category.image.url} alt={category.name} className="w-25 h-25" />
      <h2 className="font-semibold text-xl mt-1.5 ">{category.name}</h2>
    </div>
  );
};

export default CategoryItem;
