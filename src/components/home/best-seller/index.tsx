import MainHeading from "@/components/ui/MainHeading";
import Menu from "@/components/ui/menu/Menu";
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
  {
    id: crypto.randomUUID(),
    image: "/images/hero.webp",
    title: "Pizza Title",
    description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
    price: 20,
  },
];
const BestSeller = () => {
  return (
    <section className="best-seller section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading subTitle="check out" title="Our Best Sellers" />
        </div>
        <Menu items={DATA} />
      </div>
    </section>
  );
};

export default BestSeller;
