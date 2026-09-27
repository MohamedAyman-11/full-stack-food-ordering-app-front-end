import SEO from '@/components/ui/SEO';
import CartComponent from '../components/cart/index';
import { seo } from '@/constants';

const Cart = () => {
  return (
    <>
      <SEO title={seo.cart.title} description={seo.cart.description} />
      <CartComponent />
    </>
  );
};

export default Cart;
