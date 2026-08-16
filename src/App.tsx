import { useEffect } from "react";
import { getCartItems } from "./app/features/cart/cart";
import { useAppSelector } from "./app/hooks";
import Router from "./router";

function App() {
  const cart = useAppSelector(getCartItems);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
