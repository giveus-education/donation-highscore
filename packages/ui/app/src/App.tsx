import React from 'react';
import './App.css';
import  {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51HT23CJ2Y4J7zMet8sP3OiAuslVEJF1UkZk0HKOyiSDG7411mNGz5T7MBF6PJsHtElF8fsA99rzD8KhwgYYgKoRk00DdCr5OO4');

const handleClick = async (event: any) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    const data = {amount: 2000};

    // Call your backend to create the Checkout Session
    const response = await fetch('https://gx5jzd1ua2.execute-api.us-east-1.amazonaws.com/dev/checkoutsession', { method: 'POST', body: JSON.stringify(data) });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

function App() {
  return (
    <>
        <button role="link" onClick={handleClick}>
            Donate
        </button>
    </>
  );
}

export default App;
