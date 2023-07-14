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
        <TitleSortByWrap>
          <Title>All products</Title>
          <SortBy>
            <SortByTitle>Sort by</SortByTitle>
            <SelectSortBy
              name=""
              id=""
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </SelectSortBy>
          </SortBy>
        </TitleSortByWrap>
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

const TitleSortByWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

const SortBy = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  /* background-color: red; */
  justify-content: center;
`;
const SortByTitle = styled.h4`
  margin-right: 5px;
`;
const SelectSortBy = styled.select`
  padding-left: 5px;
  border-radius: 5px;
  height: 25px;
`;
