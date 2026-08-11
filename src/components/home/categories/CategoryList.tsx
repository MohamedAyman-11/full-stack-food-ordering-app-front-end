import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryItem from "./CategoryItem";

const DATA = [
  {
    id: crypto.randomUUID(),
    title: "Pizzas",
    img: "/images/pizza.jpeg",
  },
  {
    id: crypto.randomUUID(),
    title: "Pasta",
    img: "/images/pasta.jpeg",
  },
  {
    id: crypto.randomUUID(),
    title: "Burgers",
    img: "/images/burger.jpeg",
  },
  {
    id: crypto.randomUUID(),
    title: "Desserts",
    img: "/images/desserts.jpeg",
  },
  {
    id: crypto.randomUUID(),
    title: "Drinks",
    img: "/images/drinks.jpeg",
  },
  {
    id: crypto.randomUUID(),
    title: "Salads",
    img: "/images/salads.jpg",
  },
];
const CategoryList = () => {
  return (
    <div className="mt-7">
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
          {DATA.map((category) => (
            <CarouselItem
              key={category.id}
              className=" basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <CategoryItem category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryList;
