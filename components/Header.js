import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import CloseMenuIcon from "./CloseMenuIcon";
import MenuIcons from "./MenuIcons";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchKeyword, setSearchKeyword, searchResult, setsearchResult } =
    useContext(CartContext);
  const router = useRouter();

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }
  async function search(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/search/${searchKeyword}`);
      const data = await response.json();
      console.log(data);
      setsearchResult(data);
      console.log(data);
      router.push(`/search/${searchKeyword}`);
    } catch (error) {
      console.log("Failed to search for product", error);
    }
  }
  return (
    <StyledHeader>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Logo href={"/"}>Ecommerce</Logo>
      <StyledNav menuopen={menuOpen} onClick={toggleMenu}>
        <StyledLink href={"/"}>Home</StyledLink>
        <StyledLink href={"/products"}>All products</StyledLink>
        <StyledLink href={"/product/64b471e16f4b2461a3415088"}>
          Drum lessons
        </StyledLink>
        <StyledLink href={"/about"}>About</StyledLink>
        <StyledLink href={"/contact"}>Contact</StyledLink>
        <StyledLink href={"/cart"}>Cart ({cartProducts.length})</StyledLink>
      </StyledNav>
      <ContainerInput onSubmit={search}>
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button type="submit">Go</button>
      </ContainerInput>

      <NavButton onClick={toggleMenu}>
        {!menuOpen && <MenuIcons />}
        {menuOpen && <CloseMenuIcon />}
      </NavButton>
    </StyledHeader>
  );
}
const ContainerInput = styled.form`
  display: inline-block;
  position: relative;

  input {
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* position: absolute; */
  }

  button {
    background-color: #5542f6;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 18px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.9s ease;
  }

  button:hover {
    transform: scale(1.1);
    color: rgb(255, 255, 255);
    background-color: #5542f6;
  }
  input:focus {
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.9s ease;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  min-width: 40px;
  height: 40px;
  color: white;
  border: 0;
  padding: 0;
  cursor: pointer;
  z-index: 3;
  transition: all 1s ease;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const StyledHeader = styled.header`
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  transition: all 1s ease;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  margin-left: 20px;
  z-index: 3;
  @media screen and (max-width: 769px) {
    margin-left: 0;
    font-size: 17px;
  }
`;

const StyledLink = styled(Link)`
  padding: 20px;
  color: #fff;
  text-decoration: none;
  @media only screen and (max-width: 900px) and (min-width: 769px) {
    padding: 20px 5px;
  }
`;

const StyledNav = styled.nav.attrs((props) => ({
  menuopen: props.menuopen.toString(),
}))`
  display: flex;
  gap: 15px;
  padding: 0 20px 0 20px;

  @media screen and (max-width: 769px) {
    display: flex;
    flex-direction: column;
    background-color: #222;
    font-size: 20px;
    position: absolute;
    padding: 0;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    ${(props) =>
      props.menuopen === "true"
        ? `
          opacity: 1;
          visibility: visible;
        `
        : `
          opacity: 0;
          visibility: hidden;
        `}

    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  }
`;
