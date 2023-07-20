import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  height: 100%;              
  box-sizing: border-box;
}
body{

background-color: #eee;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  padding-bottom: 60px; 
  @media screen and (max-width: 769px) {
    padding-bottom: 100px; 
  }
}
`;
export default GlobalStyle;
