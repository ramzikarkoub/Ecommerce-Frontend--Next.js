import CartContextProvider from "@/components/CartContext";
import GlobalStyle from "@/styles/GlobalStyle";
// import { Helmet } from "react-helmet";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function App({ Component, pageProps }) {
  return (
    <>
      <HelmetProvider>
        {" "}
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </HelmetProvider>
    </>
  );
}
