import useGetExtras from "@/hooks/extras/useGetExtra";
import Loading from "./Loading";
import DeleteExtra from "./DeleteExtra";
import EditExtra from "./EditExtra";
interface Extra {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
const ExtrasList = () => {
  const { data, isPending } = useGetExtras();
  if (isPending) return <Loading />;
  return (
    <div className="my-5">
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((extra: Extra) => (
            <li
              key={extra.id}
              className="flex items-center justify-between p-2.5 px-4 bg-gray-200
              transition-all duration-300
             hover:bg-gray-300 rounded-lg border-border border"
            >
              <div>
                <h4 className="font-semibold">{extra.name}</h4>
              </div>
              <div className="flex items-center gap-3">
                <EditExtra extraName={extra.name} id={extra.id} />
                <DeleteExtra id={extra.id} />
              </div>
            </li>
          ))
        ) : (
          <h2>No Extras Found</h2>
        )}
      </ul>
    </div>
  );
};

export default ExtrasList;
