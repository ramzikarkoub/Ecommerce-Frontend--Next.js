import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import Product from "@/models/product";
import Category from "@/models/category";
import { connectToDB } from "@/utils/database";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import WhiteBox from "@/components/WhiteBox";
import Button from "@/components/button";
import Head from "next/head";

export default function ProductPage({ product, category }) {
  const { addToCart } = useContext(CartContext);
  const [productProperties, setProductProperties] = useState([]);
  const [productToAddToCard, setProductToAddToCard] = useState({});

  useEffect(() => {
    const initialProperties = category?.properties.map((property) => ({
      name: property.name,
      value: product.properties[property.name],
    }));
    setProductProperties(initialProperties);

    setProductToAddToCard({
      ...product,
      properties: initialProperties,
    });
  }, [product]);

  useEffect(() => {
    setProductToAddToCard({
      ...product,
      properties: productProperties,
    });
  }, [productProperties]);
  // const metadata = {
  //   title: product.title,
  //   description:
  //     "Discover an extensive collection of high-quality drums, percussion instruments, and accessories for drummers of all skill levels. Whether you're a beginner or a seasoned pro, our wide range of products, including drum sets, cymbals, drumsticks, and more, will cater to your every need. Browse through our handpicked selection of top brands and find the perfect gear to enhance your rhythm and elevate your performance. Get ready to unleash your creativity and passion for music with [Your Drum Center Name]. Happy drumming!",
  // };
  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceProperties>
              <div>
                <PropertiesList>
                  {category?.properties.map((pro, i) => (
                    <PropertyItem key={i}>
                      <PropertyName>{pro.name}</PropertyName>
                      <PropertyValue
                        defaultValue={product.properties[pro.name]}
                        onChange={(e) => {
                          const selectedProperty = {
                            name: pro.name,
                            value: e.target.value,
                          };
                          setProductProperties((prevProperties) => {
                            const updatedProperties = prevProperties.filter(
                              (property) => property.name !== pro.name
                            );
                            return [...updatedProperties, selectedProperty];
                          });
                        }}
                      >
                        {pro.values.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </PropertyValue>
                    </PropertyItem>
                  ))}
                </PropertiesList>
              </div>
              <PriceRow>
                <Price>${product.price}</Price>
                <Button
                  primary="true"
                  onClick={() => addToCart(productToAddToCard)}
                >
                  Add to cart
                </Button>
              </PriceRow>
            </PriceProperties>
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
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const PriceProperties = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    align-items: start;
    flex-direction: column;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    align-self: flex-end;
    margin-right: 20px;
  }
`;
const Price = styled.span`
  font-size: 1.4rem;
  margin-right: 10px;
`;
const PropertiesList = styled.ul`
  list-style: none;
  padding: 0;
`;
const PropertyItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  /* width: 100%; */
`;
const PropertyName = styled.span`
  margin-right: 5px;
  /* width: 100%; */
`;
const PropertyValue = styled.select`
  width: 60px;
  border-radius: 5px;
  height: 20px;
  width: 100px;
`;

export async function getServerSideProps(context) {
  await connectToDB();
  const { id } = context.query;
  const product = await Product.findById(id);
  const category = await Category.findById(product.category);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}
