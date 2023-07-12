import CartContextProvider from "@/components/CartContext";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </div>
  );
}
