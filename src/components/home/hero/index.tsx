import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import HeroImage from "./HeroImage";
import Text from "./Text";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface Hero {
  id: string;
  title: string;
  description: string;
  image: string;
}
export const HeroData: Hero[] = [
  {
    id: crypto.randomUUID(),
    title: "Slice into Happiness",
    description:
      "Craving pizza? We've got you covered with fresh ingredients, endless flavors, and the fastest delivery. Your perfect slice is just a tap away!",
    image: "images/hero-pizza.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Bite into Deliciousness",
    description:
      "Juicy, flavorful, and stacked with all your favorite toppings. Our burgers are made fresh to satisfy every craving, with every bite packed with goodness!",
    image: "images/hero-burger.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Sweeten Your Day",
    description:
      "Start your day with something delicious! Enjoy golden waffles topped with fresh berries, creamy goodness, and a drizzle of sweetness in every bite.",
    image: "images/hero-dessert.png",
  },
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);
  return (
    <div className="hero bg-primary/5">
      <div className="container">
        <Carousel
          className="relative h-full w-full"
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {HeroData.map((item) => (
              <CarouselItem key={item.id} className="h-full">
                <div className="grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <Text title={item.title} description={item.description} />
                  <HeroImage image={item.image} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Dots */}
          <div className="absolute -bottom-10 md:bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {HeroData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ",
                  current === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-300 hover:bg-primary/50 cursor-pointer",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
