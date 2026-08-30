import EditSize from "../sizes/EditSize";
import DeleteSize from "../sizes/DeleteSize";
import useGetSizes from "@/hooks/sizes/useGetSizes";
import Loading from "../extras/Loading";
interface Size {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
const SizeList = () => {
  const { data, isPending } = useGetSizes();
  if (isPending) return <Loading />;
  return (
    <div className="my-5">
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((size: Size) => (
            <li
              key={size.id}
              className="flex items-center justify-between p-2.5 px-4 bg-gray-200
              transition-all duration-300
             hover:bg-gray-300 rounded-lg border-border border"
            >
              <div>
                <h4 className="font-semibold">{size.name}</h4>
              </div>
              <div className="  flex items-center gap-3">
                <EditSize id={size.id} sizeName={size.name} />
                <DeleteSize id={size.id} />
              </div>
            </li>
          ))
        ) : (
          <h2>No Sizes Found</h2>
        )}
      </ul>
    </div>
  );
};

export default SizeList;
