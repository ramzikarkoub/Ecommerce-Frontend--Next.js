import Featured from "../components/Featured";
import Header from "../components/Header";
import React, { useContext } from "react";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredProductId = "64b6bdb4a69123250490b2d6";
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
