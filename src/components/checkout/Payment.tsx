import { ChevronRight, CreditCard } from 'lucide-react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import type { PaymentMethod, Step } from './OrderConfirm';
import { Button, buttonVariants } from '../ui/button';

const PAYMENT_METHODS = [
  {
    label: 'Credit / Debit Card',
    value: 'credit',
    description: 'Pay securely with your card',
  },
  {
    label: 'Cash on Delivery',
    value: 'on_delivery',
    description: 'Pay when you receive',
  },
] as const;

interface Props {
  setPaymentMethod: (value: PaymentMethod) => void;
  paymentMethod: PaymentMethod;
  setCurrentStep: (val: Step) => void;
}

const Payment = ({ setCurrentStep, paymentMethod, setPaymentMethod }: Props) => {
  console.log(paymentMethod);
  const onClickHandler = () => {
    setCurrentStep('review');
  };
  return (
    <div className="space-y-6 fw-full lg:max-w-150 px-5 py-4 sm:px-7 sm:py-6 bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] rounded-2xl animate-in fade-in-20 slide-in-from-bottom-4 duration-600">
      <div className="flex items-center gap-3 text-primary ">
        <CreditCard className="stroke-2 size-7" />
        <h3 className="text-xl font-semibold">Payment Method</h3>
      </div>
      <RadioGroup
        aria-label="Density"
        className="w-full mt-3 gap-5"
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value)}
      >
        {PAYMENT_METHODS.map((method) => (
          <div
            onClick={() => setPaymentMethod(method.value)}
            className={` hover:border-primary  flex items-center gap-5  w-full py-4 px-2 transition-all duration-300 rounded-md
               border ${method.value === paymentMethod ? 'border-primary bg-primary/3.5' : 'border-border hover:bg-primary/3.5'} cursor-pointer`}
            key={method.value}
          >
            <RadioGroupItem
              value={method.value}
              id={method.value}
              onClick={() => setPaymentMethod(method.value)}
              className={`cursor-pointer`}
            />
            <div>
              <Label htmlFor={method.value} className="flex-1 cursor-pointer ">
                <div>
                  <h4 className="font-semibold text-primary"> {method.label}</h4>
                  <p className="text-[13px] text-gray-500 mt-2">{method.description}</p>
                </div>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      <div>
        <Button
          onClick={onClickHandler}
          type="button"
          variant="outline"
          className={`${buttonVariants({ size: 'lg' })} w-full  sm:w-fit text-white! px-8! 
          cursor-pointer! h-12 rounded-2xl text-[16px] font-medium`}
        >
          Review order <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Payment;
