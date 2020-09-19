import React from 'react';
import './App.css';
import {Elements} from "@stripe/react-stripe-js";
import  {loadStripe} from "@stripe/stripe-js";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HT23CJ2Y4J7zMet8sP3OiAuslVEJF1UkZk0HKOyiSDG7411mNGz5T7MBF6PJsHtElF8fsA99rzD8KhwgYYgKoRk00DdCr5OO4');



const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event:any) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

function App() {
  return (
      <Elements stripe={stripePromise}>
          <CheckoutForm />
      </Elements>
  );
}

export default App;
