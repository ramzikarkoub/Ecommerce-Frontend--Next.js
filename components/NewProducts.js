import React from "react";
import ProductsGrid from "./ProductsGrid";
import styled from "styled-components";

export default function NewProducts(products) {
  console.log(products);
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;
const Center = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

// import React from "react";
// import styled from "styled-components";
// import ProductGrid from "./ProductsGrid";

// import ProductsGrid from "./ProductsGrid";
// const Title = styled.h2`
//   font-size: 2rem;
//   margin: 30px 0 20px;
//   font-weight: normal;
// `;
// export default function NewProducts({ products }) {
//   console.log(products);
//   return (
//     <div>
//       <Title>New Arrivals</Title>
//       <ProductsGrid products={products} />
//     </div>
//   );
// }
