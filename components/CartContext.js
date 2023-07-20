import React, { useState, useEffect } from "react";
const { createContext } = require("react");
export const CartContext = createContext({});
export default function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setsearchResult] = useState("");
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

  const addToCart = (productToAddToCard) => {
    setCartProducts((prev) => [...prev, productToAddToCard]);
  };

  const removeFromCart = (productToRemove) => {
    setCartProducts((prev) => {
      const productIndex = prev.findIndex(
        (product) => product._id === productToRemove._id
      );
      if (productIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart.splice(productIndex, 1);
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
  };
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        clearCart,
        searchResult,
        setsearchResult,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
