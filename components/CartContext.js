import React, { useState, useEffect } from "react";
const { createContext } = require("react");
export const CartContext = createContext({});
export default function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addToCart = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeFromCart = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.lastIndexOf(productId);
      if (pos !== -1) {
        const updatedCart = prev.filter((value, index) => index !== pos);
        if (updatedCart.length > 0) {
          ls?.setItem("cart", JSON.stringify(updatedCart));
        } else {
          ls?.removeItem("cart");
        }
        return updatedCart;
      }
      return prev;
    });
  };

  const clearCart = () => {
    ls.clear();
    console.log(cartProducts);
  };
  console.log(cartProducts);
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
