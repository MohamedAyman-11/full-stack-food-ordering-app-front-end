import Menu from "../ui/menu/Menu";
const DATA = [
  {
    id: crypto.randomUUID(),
    title: "Pizza",
    products: [
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
        price: 20,
      },
      {
        id: crypto.randomUUID(),
        image: "/images/hero.webp",
        title: "Pizza Title",
        description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
        price: 20,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Burger",
    products: [
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
        price: 20,
      },
      {
        id: crypto.randomUUID(),
        image: "/images/hero.webp",
        title: "Pizza Title",
        description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
        price: 20,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Pasta",
    products: [
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
        price: 20,
      },
      {
        id: crypto.randomUUID(),
        image: "/images/hero.webp",
        title: "Pizza Title",
        description: "kncjwenuvnwibcvuiwbcuibwyhbvyh",
        price: 20,
      },
    ],
  },
];

const MenuList = () => {
  return (
    <div>
      {DATA.map((category) => (
        <section className="best-seller section-gap">
          <div className="container">
            <div className="text-center">
              <h2 className="text-primary font-bold text-4xl italic">
                {category.title}
              </h2>
            </div>
            <Menu items={category.products} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuList;
