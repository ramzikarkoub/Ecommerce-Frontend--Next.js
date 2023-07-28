import { CartContext } from "@/components/CartContext";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@/components/button";
import Title from "@/components/Title";
import Center from "@/components/Center";
import WhiteBox from "@/components/WhiteBox";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import Head from "next/head";

export default function cart() {
  const { cartProducts, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  console.log(products);
  console.log(cartProducts);
  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      phoneNumber,
      cartProducts,
    });

    if (response.data && response.data.url) {
      window.location.href = response.data.url;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let total = 0;
  cartProducts.map((prod) => {
    const price = products?.find((p) => p._id === prod._id)?.price || 0;
    total += price;
  });

  const addMoreOfthisProduct = (product) => {
    addToCart(product);
  };
  const removeMoreOfThisProduct = (product) => {
    removeFromCart(product);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  {
    if (isSuccess) {
      return (
        <>
          <Center>
            <ColumnsWrapperSuccess>
              <Box>
                <h1>Thanks for your order!</h1>
                <p>We will email you when your order will be sent.</p>
              </Box>
            </ColumnsWrapperSuccess>
          </Center>
        </>
      );
    }
    return (
      <div>
        <Head>
          <title>Cart</title>
          <meta name="description" content="Cart" />
        </Head>

        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <Title>Cart</Title>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {!!products.length && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox
                            onClick={() =>
                              router.push(`product/${product._id}`)
                            }
                          >
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>

                        <td>
                          <Button
                            onClick={() => removeMoreOfThisProduct(product)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter(
                                (pro) => pro._id == product._id
                              ).length
                            }
                          </QuantityLabel>
                          <Button onClick={() => addMoreOfthisProduct(product)}>
                            +
                          </Button>
                        </td>
                        <td>
                          $
                          {cartProducts.filter((pro) => pro._id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <th>Total products</th>
                      <th>Total quantity</th>
                      <th>Total Price</th>
                    </tr>
                    <tr>
                      <td>{products.length}</td>
                      <td>{cartProducts.length}</td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </WhiteBox>
            {!!cartProducts?.length && (
              <WhiteBox>
                <h2>Order information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="phoneNumber"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
                />
                <Button black="true" block="true" onClick={goToPayment}>
                  Continue to payment
                </Button>
              </WhiteBox>
            )}
          </ColumnsWrapper>
        </Center>
      </div>
    );
  }
}

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;
const ColumnsWrapperSuccess = styled.div`

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  } */
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  cursor: pointer;
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
