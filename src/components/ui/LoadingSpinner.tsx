import { Spinner } from "./spinner";
interface Props {
  size: string;
}
const LoadingSpinner = ({ size }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <Spinner className={`${size} text-primary`} />
    </div>
  );
};

export default LoadingSpinner;
