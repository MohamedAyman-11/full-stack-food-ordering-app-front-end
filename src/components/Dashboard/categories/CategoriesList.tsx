import type { Category } from "@/interfaces";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

interface Props {
  categories: Category[];
}
const CategoriesList = ({ categories }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 my-8">
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div
            key={cat.id}
            className="group bg-gray-200 p-3 rounded-md relative"
          >
            <img
              src={cat.image.url}
              alt={cat.name}
              className="w-60 h-60 mx-auto object-contain"
            />
            <div
              className="z-40 rounded-md transition-all duration-300 flex items-center
               bg-gray-100/50 justify-center
             w-full h-full absolute inset-1/2 transform -translate-1/2 gap-5 opacity-0 group-hover:opacity-100"
            >
              <EditCategory id={cat.id} />
              <DeleteCategory id={cat.id} />
            </div>
          </div>
        ))
      ) : (
        <h2>No Categories found</h2>
      )}
    </div>
  );
};

export default CategoriesList;
