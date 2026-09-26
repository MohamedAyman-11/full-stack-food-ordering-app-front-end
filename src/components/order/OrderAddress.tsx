import { MapPin } from 'lucide-react';
interface Address {
  street: string;
  postal_code: string;
  city: string;
  country: string;
}

interface Props {
  address: Address;
  customerPhone: string;
}
const OrderAddress = ({ address, customerPhone }: Props) => {
  return (
    <div className="bg-card border rounded-xl p-4">
      <div className="flex items-center gap-2">
        <MapPin className="text-primary size-4" />
        <h3 className="text-[16px] font-semibold text-primary ">Delivery Address</h3>
      </div>
      <div className="space-y-1.5 text-sm text-muted-foreground mt-5">
        <p>Home</p>

        <p>{address.street}</p>

        <p>
          {address.city}, {address.country} {address.postal_code}
        </p>
      </div>
      <div className="space-y-1.5 text-sm text-muted-foreground mt-5">
        <p>Phone</p>

        <p>{customerPhone}</p>
      </div>
    </div>
  );
};

export default OrderAddress;
