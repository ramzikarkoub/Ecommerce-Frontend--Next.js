const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/Order";
import { connectToDB } from "@/utils/database";

const endpointSecret =
  "whsec_09e28dbeac0e7d5451a8a8ec719440dcd274362bab6af26fbfc93cd6189fadd9";

export default async function handler(req, res) {
  await connectToDB;
  const sig = req.headers["stripe-signature"];
  console.log("siiiiiiiiiiiiiiiiiid", sig);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
    console.log("eeeveeeeeeeeeeeeeeeeeeeeent", event);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      console.log("hahahahhahahahhahahahhahahahha", paid);
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

//easy-worthy-handy-flashy
// account id acct_1NONuuKHddlM4nB3
