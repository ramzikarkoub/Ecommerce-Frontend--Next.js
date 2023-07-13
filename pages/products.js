import Header from "@/components/Header";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Center from "@/components/Center";

export default function ProductsPage({ products }) {
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let sorted = [...products];
    if (sortBy === "newest") {
      sorted.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  }, [sortBy, products]);

  console.log(sortBy);
  return (
    <>
      <Header />

      <Center>
        <Title>All products</Title>
        <div>
          <div>Sort by</div>
          <select
            name=""
            id=""
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <ProductsGrid products={sortedProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
