import MainHeading from "@/components/ui/MainHeading";
import Menu from "@/components/ui/menu/Menu";
import SectionWrapper from "@/components/ui/SectionWrapper";
const DATA = [
  {
    id: crypto.randomUUID(),
    image: "/images/hero.webp",
    title: "Pizza Title",
    description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
    price: 20,
  },
  {
    id: crypto.randomUUID(),
    image: "/images/hero.webp",
    title: "Pizza Title",
    description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
    price: 30,
  },
  {
    id: crypto.randomUUID(),
    image: "/images/hero.webp",
    title: "Pizza Title",
    description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
    price: 25,
  },
];
const BestSeller = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <MainHeading subTitle="check out" title="Our Best Sellers" />
      </div>
      <Menu products={DATA} />
    </SectionWrapper>
  );
};

export default BestSeller;
