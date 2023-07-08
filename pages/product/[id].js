import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import WhiteBox from "@/components/WhiteBox";
import Button from "@/components/button";

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary="true" onClick={() => addToCart(product._id)}>
                  {/* <CartIcon /> */}
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export async function getServerSideProps(context) {
  await connectToDB();
  const { id } = context.query;
  //   console.log(id);
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
