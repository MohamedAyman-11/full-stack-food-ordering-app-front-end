import useGetDeliveryPartners from '@/hooks/admin/useGetDeliveryPartners';
import AddDeliveryBoy from './AddDeliveryBoy';
import Loading from '../Loading';
import DeliveryPartnersList from './DeliveryPartnersList';
import EmptyState from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Info, Plus } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { data, isPending } = useGetDeliveryPartners();
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full lg:pl-6 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-start font-semibold tracking-tight text-primary">Delivery Partners</h3>
        <AddDeliveryBoy open={open} setOpen={setOpen} />
      </div>
      {isPending ? (
        <Loading />
      ) : data && data.length > 0 ? (
        <DeliveryPartnersList deliveries={data} />
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No delivery partners yet"
            description="You don't have any delivery partners yet. Add your first partner to start managing deliveries."
            icon={<Info className="size-6" />}
            action={
              <Button
                onClick={() => setOpen(true)}
                variant="default"
                type="button"
                size="lg"
                className="cursor-pointer px-6! py-2! font-semibold"
              >
                <Plus className="stroke-3" />
                Add Partner
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Index;
