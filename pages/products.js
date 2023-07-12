import Header from "@/components/Header";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import React from "react";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Center from "@/components/Center";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />

      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const products = await Product.find({}, null, { id: -1 });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}