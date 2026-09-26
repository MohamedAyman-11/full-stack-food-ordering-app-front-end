import { CreditCard } from 'lucide-react';

interface Props {
  paymentMethod: 'CREDIT' | 'ON_DELIVERY';
  paymentStatus: 'PAID' | 'UNPAID';
}

const PaymentInformation = ({ paymentMethod, paymentStatus }: Props) => {
  return (
    <div className="bg-card border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-5">
        <CreditCard className="text-primary size-4" />
        <h3 className="text-[16px] font-semibold text-primary ">Payment Information</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 ">Payment Method</p>
          <p className="text-sm text-gray-400 ">
            {paymentMethod === 'CREDIT' ? 'Credit Card (Online)' : 'Cash (on Delivery)'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 ">Payment Status</p>
          <p
            className={`text-xs text-gray-400 rounded-full 
              ${paymentStatus === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} py-1 font-semibold px-2`}
          >
            {paymentStatus == 'PAID' ? 'Paid' : 'Unpaid'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
