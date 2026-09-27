import { useEffect } from 'react';
import { getCartItems } from './app/features/cart/cart';
import { useAppSelector } from './app/hooks';
import Router from './router';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const cart = useAppSelector(getCartItems);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </>
  );
}

export default App;
