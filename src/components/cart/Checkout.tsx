import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <div className="border-border border p-5 w-full rounded-2xl sticky top-25 lg:static bg-gray-50">
      <h4 className="text-xl md:text-2xl font-semibold">Checkout</h4>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
