import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const stripe = require('stripe')('sk_test_51HT23CJ2Y4J7zMetluzDXSFVzO9hzWHxZgLY9uHTpfrP6OgsYFU3kY4gi6zgHjYRX6GgvtA868NW6jGuR7fkWcai00kak4wKJU');

export const handle: APIGatewayProxyHandler = async (event, _context) => {
  const body = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Donation",
          },
          unit_amount: body.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      id: session.id
    }, null, 2),
  };
}
