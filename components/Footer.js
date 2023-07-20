import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterNav>
        <StyledLink href={"/"}>Home</StyledLink>
        <StyledLink href={"/products"}>All products</StyledLink>
        <StyledLink href={"/about"}>About</StyledLink>
        <StyledLink href={"/contact"}>Contact</StyledLink>
        <StyledLink href={"/cart"}>Cart</StyledLink>
      </FooterNav>
      <Logo>&copy; Ramzi Karkoub 2023</Logo>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  margin-top: 30px;
  background-color: #222;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Logo = styled.div`
  font-size: 12px;
  margin-right: 50px;
  @media screen and (max-width: 769px) {
    flex-direction: column;
    margin-right: 0;
    padding: 5px;
  }
`;
