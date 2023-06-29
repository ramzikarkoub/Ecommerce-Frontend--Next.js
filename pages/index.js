import Featured from "../components/Featured";
import Header from "../components/Header";
import React, { useContext } from "react";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import NewProducts from "@/components/NewProducts";
import { CartContext } from "@/components/CartContext";

export default function HomePage({ featuredProduct, newProducts }) {
  console.log(newProducts);
  // const lastElement = newProduct.slice(-1);
  // console.log(lastElement);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "649275266eb75cfc01efecf6";
  await connectToDB();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
