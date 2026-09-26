import { buttonVariants } from '@/components/ui/button';
import EmptyState from '@/components/ui/EmptyState';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Routes } from '@/constants';
import { Info } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import CancelContent from './CancelContent';

const Cancel = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return (
      <SectionWrapper>
        <EmptyState
          icon={<Info className="size-7" />}
          title="Order Not Found"
          description="We couldn't find a valid order. Please return to the menu and place your order first."
          action={
            <Link
              to={`/${Routes.MENU}`}
              className={`${buttonVariants({
                variant: 'default',
                size: 'lg',
              })} px-5! py-2! font-semibold`}
            >
              Browse Menu
            </Link>
          }
        />
      </SectionWrapper>
    );
  }

  return <CancelContent orderId={orderId} />;
};

export default Cancel;
