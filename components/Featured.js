import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./button";
import ButtonLink from "./ButtonLink.js";
import { CartContext } from "./CartContext";

export default function Featured({ product }) {
  const { cartProducts, addToCart } = useContext(CartContext);

  const addFeaturedToCart = () => {
    addToCart(product._id);
    console.log(cartProducts);
  };
  console.log(cartProducts);

  return (
    <FeaturedStyled>
      <TitleDesc>
        <Title>{product.title}</Title>
        <Desc>{product.description}</Desc>
        <ButtonsWrapper>
          <ButtonLink outline="true" white="true" href={"/"}>
            Read more
          </ButtonLink>
          <Button primary="true" onClick={addFeaturedToCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Add to cart
          </Button>
        </ButtonsWrapper>
      </TitleDesc>

      <img src={product.images[4]} alt="" width={200} />
    </FeaturedStyled>
  );
}

const FeaturedStyled = styled.div`
  background-color: #222;
  display: flex;
  padding: 50px 20px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
`;
const TitleDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  color: #fff;
`;
const Desc = styled.p`
  color: #aaa;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
