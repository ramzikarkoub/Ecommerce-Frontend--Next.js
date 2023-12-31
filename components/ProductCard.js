import React, { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "./button";
import { CartContext } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const addProductToCart = (product) => {
    const propertiesArray = Object?.entries(product.properties).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    addToCart({
      ...product,
      properties: propertiesArray,
    });
  };

  const url = `product/${product._id}`;

  return (
    <CardWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={product.images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{product.title}</Title>
        <PriceRow>
          <Price>${product.price}</Price>
          <Button
            block="true"
            primary="true"
            outline="true"
            onClick={() => addProductToCart(product)}
          >
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  /* background-color: red; */
`;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 10px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 15px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: 500;
    text-align: right;
  }
`;
