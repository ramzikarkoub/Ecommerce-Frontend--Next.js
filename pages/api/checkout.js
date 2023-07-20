// import Product from "@/models/product";
// import { connectToDB } from "@/utils/database";
// import { Order } from "@/models/Order";
// const stripe = require("stripe")(process.env.STRIPE_SK);

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.json("should be a POST request");
//     return;
//   }
//   const {
//     name,
//     email,
//     city,
//     postalCode,
//     streetAddress,
//     country,
//     phoneNumber,
//     cartProducts,
//   } = req.body;
//   console.log("hahahahahihihihihihihihih", cartProducts);
//   await connectToDB();
//   const productsIds = cartProducts.map((p) => p._id);
//   console.log("productsIdsproductsIdsproductsIds", productsIds);
//   const uniqueIds = [...new Set(productsIds)];
//   console.log("uniqueIdsuniqueIdsuniqueIds", uniqueIds);

//   // const productsInfos = await Product.find({ _id: uniqueIds });
//   // const productsInfos = await Product.find({ _id: uniqueIds });

//   let line_items = [];
//   for (const productId of uniqueIds) {
//     const productInfo = cartProducts.find(
//       (p) => p._id.toString() === productId
//     );
//     const quantity = productsIds.filter((id) => id === productId)?.length || 0;
//     console.log(
//       "productInfoproductInfoproductInfoproductInfoproductInfo",
//       productInfo.properties
//     );
//     const properties = productInfo.properties.map((property) => {
//       return { name: property.name, value: property.value };
//     });
//     console.log(
//       "propertiespropertiespropertiespropertiespropertiespropertiesproperties",
//       properties
//     );

//     if (quantity > 0 && productInfo) {
//       line_items.push({
//         quantity,
//         price_data: {
//           currency: "USD",
//           product_data: {
//             name: productInfo.title,
//           },

//           unit_amount: quantity * productInfo.price * 100,
//         },
//         // properties: cartProducts.properties,
//         properties,
//       });
//     }
//   }
//   // console.log(
//   //   "line_itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmms",
//   //   line_items.price
//   // );
//   //   res.json({ line_items });
//   const orderDoc = await Order.create({
//     line_items,
//     name,
//     email,
//     city,
//     postalCode,
//     streetAddress,
//     country,
//     phoneNumber,
//     paid: false,
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: "payment",
//     customer_email: email,
//     success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
//     cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
//     metadata: { orderId: orderDoc._id.toString(), test: "ok" },
//   });

//   res.json({
//     url: session.url,
//   });
// }
import Product from "@/models/product";
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
  // console.log("hahahahahihihihihihihihih", cartProducts);
  await connectToDB();
  const productsIds = cartProducts.map((p) => p._id);
  // console.log("productsIdsproductsIdsproductsIds", productsIds);
  const uniqueIds = [...new Set(productsIds)];
  // console.log("uniqueIdsuniqueIdsuniqueIds", uniqueIds);
  let items = [];
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = cartProducts.find(
      (p) => p._id.toString() === productId
    );
    // console.log(productInfo)
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
            // description: JSON.stringify(properties),
          },
          unit_amount: quantity * productInfo.price * 100,
        },
        quantity,
      });

      // const itemProperties = [];
      // for (let i = 0; i < quantity; i++) {
      //   itemProperties.push(properties);
      // }
    }
  }
  cartProducts.map((p) =>
    items.push({
      name: p.title,
      properties: p.properties,
      // unit_amount: quantity * productInfo.price * 100,
      // quantity,
    })
  );
  console.log("gfreger", items.properties);

  console.log("line_itemsline_itemsline_itemsline_itemsline_items", items);

  const orderDoc = await Order.create({
    items,
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
