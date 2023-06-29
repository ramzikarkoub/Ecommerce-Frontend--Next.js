import React from "react";
import styled, { css } from "styled-components";

export const ButtonStyled = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  cursor: pointer;
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: #fff;
    `}
    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: #5542f6;
      border: 1px solid #5542f6;
    `}
    ${(props) =>
    props.black &&
    props.block &&
    css`
      background-color: #000;
      color: #fff;
      width: 100%;
      display: block;
    `}
`;
const StyledButton = styled.button`
  ${ButtonStyled}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
