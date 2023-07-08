import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import CloseMenuIcon from "./CloseMenuIcon";
import MenuIcons from "./MenuIcons";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(menuOpen);
  return (
    <StyledHeader>
      <Logo href={"/"}>Ecommerce</Logo>
      <StyledNav menuOpen={menuOpen}>
        <StyledLink href={"/"}>Home</StyledLink>
        <StyledLink href={"/products"}>All products</StyledLink>
        <StyledLink href={"/categories"}>Categories</StyledLink>
        <StyledLink href={"/account"}>Account</StyledLink>
        <StyledLink href={"/cart"}>Cart ({cartProducts.length})</StyledLink>
      </StyledNav>
      {/* <StyledButton>search</StyledButton> */}
      <NavButton onClick={() => setMenuOpen((prev) => !prev)}>
        {!menuOpen && <MenuIcons />}
        {menuOpen && <CloseMenuIcon />}
      </NavButton>
    </StyledHeader>
  );
}

const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: white;
  border: 0;
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer;
  z-index: 3;
  transition: all 1s ease;

  /* transition: all 1s ease-out; */
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledHeader = styled.header`
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  transition: all 1s ease;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  z-index: 3;
  transition: all 1s ease;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
  padding: 0 20px 0 20px;
  transition: all 1s ease;
  /* transition: all 1s ease; */
  /* ${(props) =>
    props.menuOpen ? ` flex-direction: column;` : `display:none;`} */

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background-color: #222;
    position: absolute;
    padding: 0;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw; 
    /* transition: all 1s ease-out; */

   
  
    ${(props) =>
      props.menuOpen
        ? ` display: flex;  `
        : `display:none;
        `}

    /* transition: background 0.2s ease, */
    /* display: none;
  }
`;
const StyledLink = styled(Link)`
  padding: 20px;
  color: #fff;
  text-decoration: none;
`;
const StyledButton = styled.button`
  margin-right: 20px;
`;
