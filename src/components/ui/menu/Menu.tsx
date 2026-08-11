import MenuItem from "./MenuItem";

interface Props {
  items: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    image: string;
    title: string;
    description: string;
    price: number;
  }[];
}
const Menu = ({ items }: Props) => {
  return (
    <div className="mt-7">
      <ul className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((el) => (
          <MenuItem item={el} key={el.id} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
