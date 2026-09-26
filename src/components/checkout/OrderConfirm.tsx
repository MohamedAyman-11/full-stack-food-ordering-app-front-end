import { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import CheckoutForm from './CheckoutForm';
import type { OrderSchemaType } from '@/validation';
import Payment from './Payment';
import ReviewOrder from './ReviewOrder';
import CheckoutSummary from './CheckoutSummary';
import SubmitOrder from './SubmitOrder';
export type Step = 'address' | 'payment' | 'review';
export type PaymentMethod = 'credit' | 'on_delivery';

const OrderConfirm = () => {
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [address, setAddress] = useState<OrderSchemaType>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  console.log(address);

  return (
    <div className="p-5 ">
      <CheckoutSteps currentStep={currentStep} />
      <div className="flex items-start flex-col lg:flex-row gap-3 mt-6">
        <div className=" w-full lg:w-[60%] ">
          {currentStep === 'address' && <CheckoutForm setCurrentSteps={setCurrentStep} setData={setAddress} />}
          {currentStep === 'payment' && (
            <Payment
              paymentMethod={paymentMethod}
              setCurrentStep={setCurrentStep}
              setPaymentMethod={setPaymentMethod}
            />
          )}
          {currentStep === 'review' && (
            <ReviewOrder address={address!}>
              <SubmitOrder address={address!} paymentMethod={paymentMethod} />
            </ReviewOrder>
          )}
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default OrderConfirm;
