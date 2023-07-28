import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";
import { CartContext } from "@/components/CartContext";
import Head from "next/head";

export default function Search({ products }) {
  const { searchResult, searchKeyword } = useContext(CartContext);
  return (
    <>
      <Head>
        <title>{searchKeyword}</title>
        <meta name="description" content="description for page product" />
      </Head>
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
