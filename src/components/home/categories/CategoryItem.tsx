interface Props {
  category: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    title: string;
    img: string;
  };
}
const CategoryItem = ({ category }: Props) => {
  return (
    <div className="select-none flex items-center flex-col py-2 px-4 justify-between rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] ">
      <img
        src={category.img}
        alt={category.title}
        className="w-25 h-25 bg-primary!"
      />
      <h2 className="font-semibold text-xl mt-1.5 ">{category.title}</h2>
    </div>
  );
};

export default CategoryItem;
