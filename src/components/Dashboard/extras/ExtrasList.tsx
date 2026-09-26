import useGetExtras from '@/hooks/extras/useGetExtra';
import Loading from '../Loading';
import DeleteExtra from './DeleteExtra';
import EditExtra from './EditExtra';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Pages, Routes } from '@/constants';
import type { Dispatch, SetStateAction } from 'react';
interface Extra {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const ExtrasList = ({ setShowForm }: Props) => {
  const { data, isPending } = useGetExtras();
  if (isPending) return <Loading />;
  return (
    <div className="mt-10">
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
          <EmptyState
            title="No Extras found!"
            description="Add extras and optional add-ons to give customers more ways to customize their orders."
            icon={<Info className="size-6" />}
            action={
              <Button
                onClick={() => setShowForm(true)}
                variant={'default'}
                size={'lg'}
                className={'w-40 py-2 font-semibold'}
              >
                <Link to={`/${Routes.ADMIN}/${Pages.EXTRAS}`}>Create Extra</Link>
              </Button>
            }
            className="mt-10"
          />
        )}
      </ul>
    </div>
  );
};

export default ExtrasList;
