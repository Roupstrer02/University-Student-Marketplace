import { stripe } from '$lib/stripeClient';

export const POST = async ({ request }) => {
  const data = await request.json();
  const cartItems = data.items;

// Map cart items to Stripe's expected format properly
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: {
        name: item.title, 
        images: [],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity, 
  }));

  // Create session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["CA"],
    },
    mode: "payment",
    success_url: `https://tmu-marketplace.vercel.app/stripe/success`,
    cancel_url: `https://tmu-marketplace.vercel.app/cart`,
    phone_number_collection: {
      enabled: false,
    },
  });

  return new Response(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
