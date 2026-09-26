import FilterButton from './menu-filter/small-screen/FilterButton';
import SortButton from './sort/small-screen/SortButton';
interface Props {
  isLoading: boolean;
  setOption: (val: string) => void;
}
const ProductToolbar = ({ isLoading, setOption }: Props) => {
  return (
    <div className="mb-5 lg:hidden flex items-center space-x-3 mt-5 ">
      <FilterButton isLoading={isLoading} setOption={setOption} />
      <SortButton />
    </div>
  );
};

export default ProductToolbar;
