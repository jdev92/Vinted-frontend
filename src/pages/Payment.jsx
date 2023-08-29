import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, price, stripeToken } = location.state || {};
  // const { stripeToken } = location.state;

  console.log(location);
  return (
    <div className="container">
      <h2>Formulaire de paiement</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm stripeToken={stripeToken} title={title} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
