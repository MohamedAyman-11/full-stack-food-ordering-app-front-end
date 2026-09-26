import { MapPin, CreditCard, Check, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const steps = [
  {
    id: 'address',
    label: 'Address',
    icon: MapPin,
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: CreditCard,
  },
  {
    id: 'review',
    label: 'Review',
    icon: Check,
  },
];

type Step = 'address' | 'payment' | 'review';

const CheckoutSteps = ({ currentStep }: { currentStep: Step }) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className=" items-center gap-3 hidden sm:flex">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentIndex;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <span
              className={`
                flex items-center gap-2
                rounded-xl
                text-[15px]
                font-medium
                px-4 py-2.5!
                transition-all
                duration-300
                hover:${isActive ? 'bg-primary!' : 'bg-white'}
                ${isActive ? 'bg-primary text-white' : 'bg-white text-gray-500'}
                drop-shadow-sm
              `}
            >
              <Icon className="size-4 stroke-2" />
              <span>{step.label}</span>
              {index < steps.length - 1 && <ChevronRight className="size-4" />}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
