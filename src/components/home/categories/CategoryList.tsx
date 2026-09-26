import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CategoryItem from './CategoryItem';
import useGetCategories from '@/hooks/categories/useGetCategories';
import type { Category } from '@/interfaces';
import Loading from './Loading';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';

const CategoryList = () => {
  const { data, isPending } = useGetCategories();

  if (isPending) return <Loading />;

  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full relative cursor-grab"
      >
        {data && data.length > 2 && (
          <div className="absolute -top-12 right-0 z-10  gap-2 hidden md:flex mt-5">
            <CarouselPrevious className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
            <CarouselNext className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
          </div>
        )}
        <CarouselContent className="mt-5">
          {data && data.length > 0 ? (
            data.map((category: Category) => (
              <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/7">
                <CategoryItem category={category} />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="basis-full">
              <EmptyState
                title="No Categories Found"
                description="We couldn't find any categories right now."
                icon={<Info className="size-6" />}
              />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryList;
