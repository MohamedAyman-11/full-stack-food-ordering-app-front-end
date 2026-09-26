import { Mail, Phone } from 'lucide-react';
import ChangeDeliveryPartnerStatus from './ChangeDeliveryPartnerStatus';

type DeliveryPartner = {
  id: string;
  phone: string;
  email: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  vehicle: string;
};

interface Props {
  deliveries: DeliveryPartner[];
}

const DeliveryPartnersList = ({ deliveries }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="p-5 bg-white border border-border rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="min-h-10! min-w-10! rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {delivery.name[0].toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-base text-slate-950 block truncate">{delivery.name}</span>
              <span className="font-medium text-xs text-gray-400 block">{delivery.vehicle}</span>
            </div>
            <div className="ml-auto">
              <span
                className={`text-xs font-semibold rounded-full py-1 px-2 ${delivery.status == 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
              >
                {delivery.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <Mail className="size-4" /> {delivery.email}
            </p>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <Phone className="size-4" /> {delivery.phone}
            </p>
          </div>
          <div className="w-full mt-4">
            <ChangeDeliveryPartnerStatus id={delivery.id} currentStatus={delivery.status} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryPartnersList;
