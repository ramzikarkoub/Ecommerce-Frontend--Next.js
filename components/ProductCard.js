import React, { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "./button";
import { CartContext } from "./CartContext";

export default function ProductCard({
  _id,
  title,
  description,
  price,
  images,
}) {
  const { addToCart } = useContext(CartContext);
  const addFeaturedToCart = () => {
    addToCart(_id);
    // console.log(cartProducts);
  };
  //   console.log("hhhhhh", images);
  return (
    <CardWrapper>
      <WhiteBox href={"/"}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={"/"}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary="true" outline="true" onClick={addFeaturedToCart}>
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
  /* width: 120px; */
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
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;
