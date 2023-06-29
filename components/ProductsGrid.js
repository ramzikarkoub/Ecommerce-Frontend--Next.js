import React from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";

export default function ProductGrid({ products }) {
  console.log("rrrr", products.products);
  return (
    <GridDiv>
      {products?.products?.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </GridDiv>
  );
}

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
`;
