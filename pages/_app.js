import CartContextProvider from "@/components/CartContext";
import GlobalStyle from "@/styles/GlobalStyle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./Layout";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <CartContextProvider>
          <Layout>
            <NextNProgress />
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </HelmetProvider>
    </>
  );
}
