import MainHeading from '@/components/ui/MainHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import useGetBestSellerProducts from '@/hooks/products/useGetBestSellerProducts';
import Loading from './Loading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Info } from 'lucide-react';
import type { Product } from '@/interfaces';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';

const Index = () => {
  const { data, isPending } = useGetBestSellerProducts();
  return (
    <SectionWrapper>
      <div className="text-center">
        <MainHeading subTitle="Taste what everyone loves" title="Our Best Sellers" />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full relative "
          >
            {data && data.length > 2 && (
              <div className="absolute -top-12 right-0 z-10  gap-2 hidden md:flex mt-5">
                <CarouselPrevious className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
                <CarouselNext className="static translate-y-0 cursor-pointer hover:text-primary disabled:hover:text-muted-foreground" />
              </div>
            )}
            <CarouselContent className="mt-5 pb-5 cursor-grab">
              {data && data.length > 0 ? (
                data.map((product: Product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full min-[440px]:basis-2/3 min-[530px]:basis-1/2  lg:basis-1/3 2xl:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full">
                  <EmptyState
                    title="No Products Found"
                    description="We couldn't find any products right now."
                    icon={<Info className="size-6" />}
                  />
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Index;
