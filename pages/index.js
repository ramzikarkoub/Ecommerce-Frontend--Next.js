import Featured from "../components/Featured";
import React from "react";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import NewProducts from "@/components/NewProducts";
import Head from "next/head";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Head>
        <title>Ramzis drum center</title>
        <meta
          name="description"
          content="Welcome!! we are here aspiring drummers embark on an exciting rhythmic journey. At [Drummer's Name]'s Drum center, we offer top-notch drum lessons tailored to unleash your inner percussionist. Whether you're a beginner eager to learn the fundamentals or an experienced drummer seeking to refine your technique, our lessons cater to all skill levels. We strive to understand your musical goals and design lessons that align with your aspirations. With a strong emphasis on hands-on practice, you'll explore various musical styles, rudiments, and drumming concepts. Our state-of-the-art studio is equipped with top-of-the-line drum kits and recording equipment, providing an immersive learning environment. Join us for an unparalleled drumming experience and let us guide you on the path to becoming versatile drummer"
        />
      </Head>
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
