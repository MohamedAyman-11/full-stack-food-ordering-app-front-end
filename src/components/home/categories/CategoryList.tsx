import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryItem from "./CategoryItem";
import useGetCategories from "@/hooks/categories/useGetCategories";
import type { Category } from "@/interfaces";
import Loading from "./Loading";

const CategoryList = () => {
  const { data, isPending } = useGetCategories();
  if (isPending) return <Loading />;
  return (
    <div className="mt-7 ">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <div className="absolute -top-12 right-0 z-10  gap-2 hidden md:flex mt-5">
          <CarouselPrevious className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
          <CarouselNext className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
        </div>
        <CarouselContent className="mt-5">
          {data && data.length > 0 ? (
            data.map((category: Category) => (
              <CarouselItem
                key={category.id}
                className=" basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <CategoryItem category={category} />
              </CarouselItem>
            ))
          ) : (
            <div className="min-h-49.5 flex items-center justify-center">
              <h3 className="text-2xl"> No Categories Found !</h3>
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryList;
