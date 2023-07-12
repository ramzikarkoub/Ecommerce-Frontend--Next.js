import Header from "@/components/Header";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { CartContext } from "@/components/CartContext";

export default function Search({ products }) {
  const { searchResult, searchKeyword } = useContext(CartContext);
  return (
    <>
      <Header />

      {searchResult?.length ? (
        <Center>
          <ProductsGrid products={searchResult} />
        </Center>
      ) : (
        <NoResulats>
          Sorry, no result found.
          <span> &#128532;</span> Please try a different product
        </NoResulats>
      )}
    </>
  );
}

const NoResulats = styled.p`
  padding: 30px;
  font-size: 20px;
`;
