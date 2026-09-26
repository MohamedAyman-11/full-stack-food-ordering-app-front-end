import { KeyRound } from 'lucide-react';

interface Props {
  deliveryOtp: number;
}
const DeliveryOtp = ({ deliveryOtp }: Props) => {
  const otp = deliveryOtp.toString().split('');
  return (
    <div className="p-5 sm:p-6 bg-white border border-border w-full mb-8 rounded-xl shadow-2xs">
      <div className="flex items-center gap-4">
        <span className="bg-primary/20 p-2 sm:p-2.5 rounded-full text-primary">
          <KeyRound />
        </span>
        <div className="space-y-0.5">
          <h4 className="font-semibold text-lg sm:text-xl text-primary block truncate">Delivery OTP</h4>
          <span className="font-medium text-xs sm:text-sm text-gray-400 block">
            Share this with your delivery partner
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-5 mt-5">
        {otp.map((el, i) => (
          <span
            className="bg-primary/20 py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl text-primary text-sm sm:text-lg font-bold"
            key={i}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOtp;
