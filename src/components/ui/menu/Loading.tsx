import LoadingSpinner from "../LoadingSpinner";
import { DialogContent } from "../dialog";

const Loading = () => {
  return (
    <DialogContent className={"sm:max-w-106.25 min-h-[30vh] overflow-y-auto "}>
      <LoadingSpinner size="size-20" />
    </DialogContent>
  );
};

export default Loading;
