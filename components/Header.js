import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Logo href={"/"}>Ecommerce</Logo>
      <StyledNav>
        <StyledLink href={"/"}>Home</StyledLink>
        <StyledLink href={"/products"}>All products</StyledLink>
        <StyledLink href={"/categories"}>Categories</StyledLink>
        <StyledLink href={"/account"}>Account</StyledLink>
        <StyledLink href={"/cart"}>Cart ({cartProducts.length})</StyledLink>
      </StyledNav>
      <StyledButton>search</StyledButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 15px;

  /* color */
  padding: 0 20px 0 20px;
`;
const StyledLink = styled(Link)`
  padding: 20px;
  color: #fff;
  text-decoration: none;
`;
const StyledButton = styled.button`
  margin-right: 20px;
`;
