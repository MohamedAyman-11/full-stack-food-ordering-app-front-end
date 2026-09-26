import EditSize from '../sizes/EditSize';
import DeleteSize from '../sizes/DeleteSize';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { Pages, Routes } from '@/constants';
import type { Dispatch, SetStateAction } from 'react';
interface Size {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const SizeList = ({ setShowForm }: Props) => {
  const { data, isPending } = useGetSizes();
  if (isPending) return <Loading />;
  return (
    <div className="mt-10">
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
          <EmptyState
            title="No Sizes found!"
            description="Create sizes to give your items flexible options and make ordering easier."
            icon={<Info className="size-6" />}
            action={
              <Button
                onClick={() => setShowForm(true)}
                variant={'default'}
                size={'lg'}
                className={'w-40 py-2 font-semibold'}
              >
                <Link to={`/${Routes.ADMIN}/${Pages.SIZES}`}>Create Size</Link>
              </Button>
            }
            className="mt-10"
          />
        )}
      </ul>
    </div>
  );
};

export default SizeList;
