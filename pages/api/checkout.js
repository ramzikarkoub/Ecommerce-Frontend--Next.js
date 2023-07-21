import { connectToDB } from "@/utils/database";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    phoneNumber,
    cartProducts,
  } = req.body;

  await connectToDB();
  const productsIds = cartProducts.map((p) => p._id);

  const uniqueIds = [...new Set(productsIds)];

  let items = [];
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = cartProducts.find(
      (p) => p._id.toString() === productId
    );

    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    console.log(
      "productInfoproductInfoproductInfoproductInfoproductInfo",
      productInfo
    );

    if (quantity > 0 && productInfo) {
      line_items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100,
        },
        quantity,
      });
    }
  }
  cartProducts.map((p) =>
    items.push({
      name: p.title,
      properties: p.properties,
    })
  );
  console.log("gfreger", items.properties);

  const cartTotal = cartProducts.reduce((acc, cur) => acc + cur.price, 0);

  const orderDoc = await Order.create({
    items,
    cartTotal,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    phoneNumber,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    client_reference_id: orderDoc._id.toString(),
  });

  res.json({
    url: session.url,
  });
}
