import React from "react";
import ProductsGrid from "./ProductsGrid";
import styled from "styled-components";
import Center from "@/components/Center";

export default function NewProducts(products) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products.products} />
    </Center>
  );
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;
