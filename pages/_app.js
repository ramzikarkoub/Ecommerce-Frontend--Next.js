import CartContextProvider from "@/components/CartContext";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }) {
  console.log("pageProps", pageProps);
  console.log("Component", Component);

  return (
    <div>
      <GlobalStyle />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </div>
  );
}
