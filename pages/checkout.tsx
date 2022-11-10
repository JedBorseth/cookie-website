import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRecoilValue } from "recoil";
import { cartState } from "../atoms/cartStates";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const getVariable = (variable: string) => {
  return variable;
};

const stripePromise = loadStripe(
  getVariable(
    "pk_test_51M2PyKAsI6eNkS90IRrQLguf8SvWJV4cjvA8O3eE06V7KAxC1iH3Qr9jUTG07gYbEG79xqTmqHScd4J8XVqZtqpp00CisCrRET"
  )
);

export default function App(): JSX.Element {
  const [clientSecret, setClientSecret] = React.useState("");
  const cart = useRecoilValue(cartState);

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [...cart] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  const appearance: any = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
