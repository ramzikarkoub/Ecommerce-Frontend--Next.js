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
    console.log(cartProducts);
    setCartProducts((prev) => [...prev, productToAddToCard]);
    console.log(cartProducts);
  };
  console.log(cartProducts);

  // const removeFromCart = (productToRemove) => {
  //   console.log(productToRemove);
  //   setCartProducts((prev) => {
  //     const pos = prev.lastIndexOf(productToRemove);
  //     console.log(pos);
  //     if (pos !== -1) {
  //       const updatedCart = prev.filter((value, index) => index !== pos);
  //       if (updatedCart.length > 0) {
  //         ls?.setItem("cart", JSON.stringify(updatedCart));
  //       } else {
  //         ls?.removeItem("cart");
  //       }
  //       return updatedCart;
  //     }
  //     return prev;
  //   });
  //   console.log(cartProducts);
  // };
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

// import React, { useState, useEffect } from "react";
// const { createContext } = require("react");
// export const CartContext = createContext({});
// export default function CartContextProvider({ children }) {
//   const ls = typeof window !== "undefined" ? window.localStorage : null;
//   const [cartProducts, setCartProducts] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResult, setsearchResult] = useState("");
//   useEffect(() => {
//     if (cartProducts?.length > 0) {
//       ls?.setItem("cart", JSON.stringify(cartProducts));
//     }
//   }, [cartProducts]);

//   useEffect(() => {
//     if (ls && ls.getItem("cart")) {
//       setCartProducts(JSON.parse(ls.getItem("cart")));
//     }
//   }, []);

//   const addToCart = (productId) => {
//     setCartProducts((prev) => [...prev, productId]);
//   };

//   const removeFromCart = (productId) => {
//     setCartProducts((prev) => {
//       const pos = prev.lastIndexOf(productId);
//       if (pos !== -1) {
//         const updatedCart = prev.filter((value, index) => index !== pos);
//         if (updatedCart.length > 0) {
//           ls?.setItem("cart", JSON.stringify(updatedCart));
//         } else {
//           ls?.removeItem("cart");
//         }
//         return updatedCart;
//       }
//       return prev;
//     });
//   };

//   const clearCart = () => {
//     ls.clear();
//   };
//   return (
//     <CartContext.Provider
//       value={{
//         cartProducts,
//         setCartProducts,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         searchResult,
//         setsearchResult,
//         searchKeyword,
//         setSearchKeyword,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
