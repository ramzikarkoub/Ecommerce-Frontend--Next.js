import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import Product from "@/models/product";
import Category from "@/models/category";
import { connectToDB } from "@/utils/database";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import WhiteBox from "@/components/WhiteBox";
import Button from "@/components/button";

export default function ProductPage({ product, category }) {
  const { addToCart } = useContext(CartContext);
  const [productProperties, setProductProperties] = useState([]);
  const [productToAddToCard, setProductToAddToCard] = useState({});

  // Set the default product properties when the page mounts
  useEffect(() => {
    // Create an initial properties object with default values from the product
    const initialProperties = category?.properties.map((property) => ({
      name: property.name,
      value: product.properties[property.name],
    }));
    setProductProperties(initialProperties);

    // Update the productToAddToCard with the initial properties
    setProductToAddToCard({
      ...product,
      properties: initialProperties,
    });
  }, [product]);

  // Update the productToAddToCard whenever productProperties changes
  useEffect(() => {
    setProductToAddToCard({
      ...product,
      properties: productProperties,
    });
  }, [productProperties]);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceProperties>
              <div>
                <PropertiesList>
                  {category?.properties.map((pro, i) => (
                    <PropertyItem key={i}>
                      <PropertyName>{pro.name}</PropertyName>
                      <PropertyValue
                        defaultValue={product.properties[pro.value]}
                        onChange={(e) => {
                          const selectedProperty = {
                            name: pro.name,
                            value: e.target.value,
                          };
                          setProductProperties((prevProperties) => {
                            const updatedProperties = prevProperties.filter(
                              (property) => property.name !== pro.name
                            );
                            return [...updatedProperties, selectedProperty];
                          });
                        }}
                      >
                        {pro.values.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </PropertyValue>
                    </PropertyItem>
                  ))}
                </PropertiesList>
              </div>
              <PriceRow>
                <Price>${product.price}</Price>
                <Button
                  primary="true"
                  onClick={() => addToCart(productToAddToCard)}
                >
                  Add to cart
                </Button>
              </PriceRow>
            </PriceProperties>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const PriceProperties = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    align-items: start;
    flex-direction: column;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    align-self: flex-end;
    margin-right: 20px;
  }
`;
const Price = styled.span`
  font-size: 1.4rem;
  margin-right: 10px;
`;
const PropertiesList = styled.ul`
  list-style: none;
  padding: 0;
`;
const PropertyItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const PropertyName = styled.span`
  margin-right: 5px;
`;
const PropertyValue = styled.select`
  width: 60px;
  border-radius: 5px;
  height: 20px;
`;

export async function getServerSideProps(context) {
  await connectToDB();
  const { id } = context.query;
  const product = await Product.findById(id);
  const { hi } = context.query;
  console.log(hi);
  const category = await Category.findById(product.category);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}

// import Center from "@/components/Center";
// import ProductImages from "@/components/ProductImages";
// import Title from "@/components/Title";
// import Product from "@/models/product";
// import Category from "@/models/category";
// import { connectToDB } from "@/utils/database";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useContext } from "react";
// import { CartContext } from "@/components/CartContext";
// import Header from "@/components/Header";
// import WhiteBox from "@/components/WhiteBox";
// import Button from "@/components/button";

// export default function ProductPage({ product, category }) {
//   const { addToCart } = useContext(CartContext);
//   const [productProperties, setProductProperties] = useState([]);
//   const [productToAddToCard, setProductToAddToCard] = useState([]);
//   console.log(productToAddToCard);
//   console.log(product);
//   console.log(productProperties);
//   useEffect(() => {
//     setProductToAddToCard({ ...product, properties: productProperties });
//   }, [productProperties]);

//   return (
//     <>
//       <Header />
//       <Center>
//         <ColWrapper>
//           <WhiteBox>
//             <ProductImages images={product.images} />
//           </WhiteBox>
//           <div>
//             <Title>{product.title}</Title>
//             <p>{product.description}</p>
//             <PriceProperties>
//               <div>
//                 {/* {product.properties && ( */}
//                 <PropertiesList>
//                   {/* {Object.entries(product.properties).map(
//                       ([name, value], index) => (
//                         <PropertyItem key={index}>
//                           <PropertyName>{name}: </PropertyName>
//                           <PropertyValue>
//                             <select>
//                               <option selected>{value}</option>
//                               {category.properties.map((cat, i) =>
//                                 cat.values.map((v, i) => <option>{v}</option>)
//                               )}
//                             </select>
//                           </PropertyValue>
//                         </PropertyItem>
//                       )
//                     )} */}
//                   {category?.properties.map((pro, i) => (
//                     <PropertyItem key={i}>
//                       <PropertyName>{pro.name}</PropertyName>
//                       <PropertyValue
//                         defaultValue={product.properties[pro.name]}
//                         onChange={(e) => {
//                           const selectedProperty = {
//                             name: pro.name,
//                             value: e.target.value,
//                           };
//                           setProductProperties((prevProperties) => {
//                             const updatedProperties = prevProperties.filter(
//                               (property) => property.name !== pro.name
//                             );

//                             return [...updatedProperties, selectedProperty];
//                           });
//                           // UpdateProductToAddToCart();
//                         }}
//                       >
//                         {pro.values.map((v) => (
//                           <option key={v} value={v}>
//                             {v}
//                           </option>
//                         ))}
//                       </PropertyValue>
//                     </PropertyItem>
//                   ))}
//                 </PropertiesList>
//                 {/* )} */}
//               </div>
//               <PriceRow>
//                 <Price>${product.price}</Price>
//                 <Button
//                   primary="true"
//                   onClick={() => addToCart(productToAddToCard)}
//                 >
//                   Add to cart
//                 </Button>
//               </PriceRow>
//             </PriceProperties>
//           </div>
//         </ColWrapper>
//       </Center>
//     </>
//   );
// }

// const ColWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 0.8fr 1.2fr;
//   gap: 40px;
//   margin-top: 40px;
//   @media screen and (max-width: 768px) {
//     display: block;
//   }
// `;
// const PriceProperties = styled.div`
//   display: flex;
//   /* gap: 30px; */
//   justify-content: space-between;
//   align-items: flex-end;
//   @media screen and (max-width: 768px) {
//     /* justify-content: end; */
//     align-items: start;
//     flex-direction: column;
//   }
// `;
// const PriceRow = styled.div`
//   display: flex;
//   align-items: center;
//   @media screen and (max-width: 768px) {
//     align-self: flex-end;
//     margin-right: 20px;
//   }
// `;
// const Price = styled.span`
//   font-size: 1.4rem;
//   margin-right: 10px;
// `;
// const PropertiesList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;
// const PropertyItem = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 8px;
// `;
// const PropertyName = styled.span`
//   /* font-weight: bold; */
//   margin-right: 5px;
// `;
// const PropertyValue = styled.select`
//   width: 60px;
//   border-radius: 5px;
//   height: 20px;
// `;

// export async function getServerSideProps(context) {
//   await connectToDB();
//   const { id } = context.query;
//   const product = await Product.findById(id);
//   const { hi } = context.query;
//   console.log(hi);
//   const category = await Category.findById(product.category);
//   return {
//     props: {
//       product: JSON.parse(JSON.stringify(product)),
//       category: JSON.parse(JSON.stringify(category)),
//     },
//   };
// }

// // import Center from "@/components/Center";
// // import ProductImages from "@/components/ProductImages";
// // import Title from "@/components/Title";
// // import Product from "@/models/product";
// // import Category from "@/models/category";
// // import { connectToDB } from "@/utils/database";
// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { useContext } from "react";
// // import { CartContext } from "@/components/CartContext";
// // import Header from "@/components/Header";
// // import WhiteBox from "@/components/WhiteBox";
// // import Button from "@/components/button";

// // export default function ProductPage({ product, category }) {
// //   const { addToCart } = useContext(CartContext);
// //   const [properties, setProperties] = useState([]);
// //   console.log(category);
// //   console.log(product.properties);
// //   console.log(properties);

// //   return (
// //     <>
// //       <Header />
// //       <Center>
// //         <ColWrapper>
// //           <WhiteBox>
// //             <ProductImages images={product.images} />
// //           </WhiteBox>
// //           <div>
// //             <Title>{product.title}</Title>
// //             <p>{product.description}</p>
// //             <PriceProperties>
// //               <div>
// //                 {/* {product.properties && ( */}
// //                 <PropertiesList>
// //                   {/* {Object.entries(product.properties).map(
// //                       ([name, value], index) => (
// //                         <PropertyItem key={index}>
// //                           <PropertyName>{name}: </PropertyName>
// //                           <PropertyValue>
// //                             <select>
// //                               <option selected>{value}</option>
// //                               {category.properties.map((cat, i) =>
// //                                 cat.values.map((v, i) => <option>{v}</option>)
// //                               )}
// //                             </select>
// //                           </PropertyValue>
// //                         </PropertyItem>
// //                       )
// //                     )} */}
// //                   {category.properties.map((pro, i) => (
// //                     <PropertyItem key={i}>
// //                       <PropertyName>{pro.name}</PropertyName>
// //                       <PropertyValue
// //                         defaultValue={product.properties[pro.name]}
// //                         onChange={(e) => {
// //                           const selectedProperty = {
// //                             name: pro.name,
// //                             value: e.target.value,
// //                           };
// //                           setProperties((prevProperties) => {
// //                             const updatedProperties = prevProperties.filter(
// //                               (property) => property.name !== pro.name
// //                             );
// //                             return [...updatedProperties, selectedProperty];
// //                           });
// //                         }}
// //                       >
// //                         {pro.values.map((v) => (
// //                           <option key={v} value={v}>
// //                             {v}
// //                           </option>
// //                         ))}
// //                       </PropertyValue>
// //                     </PropertyItem>
// //                   ))}
// //                 </PropertiesList>
// //                 {/* )} */}
// //               </div>
// //               <PriceRow>
// //                 <Price>${product.price}</Price>
// //                 <Button primary="true" onClick={() => addToCart(product._id)}>
// //                   Add to cart
// //                 </Button>
// //               </PriceRow>
// //             </PriceProperties>
// //           </div>
// //         </ColWrapper>
// //       </Center>
// //     </>
// //   );
// // }

// // const ColWrapper = styled.div`
// //   display: grid;
// //   grid-template-columns: 0.8fr 1.2fr;
// //   gap: 40px;
// //   margin-top: 40px;
// //   @media screen and (max-width: 768px) {
// //     display: block;
// //   }
// // `;
// // const PriceProperties = styled.div`
// //   display: flex;
// //   /* gap: 30px; */
// //   justify-content: space-between;
// //   align-items: flex-end;
// //   @media screen and (max-width: 768px) {
// //     /* justify-content: end; */
// //     align-items: start;
// //     flex-direction: column;
// //   }
// // `;
// // const PriceRow = styled.div`
// //   display: flex;
// //   align-items: center;
// //   @media screen and (max-width: 768px) {
// //     align-self: flex-end;
// //     margin-right: 20px;
// //   }
// // `;
// // const Price = styled.span`
// //   font-size: 1.4rem;
// //   margin-right: 10px;
// // `;
// // const PropertiesList = styled.ul`
// //   list-style: none;
// //   padding: 0;
// // `;
// // const PropertyItem = styled.li`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   margin-bottom: 8px;
// // `;
// // const PropertyName = styled.span`
// //   /* font-weight: bold; */
// //   margin-right: 5px;
// // `;
// // const PropertyValue = styled.select`
// //   width: 60px;
// //   border-radius: 5px;
// //   height: 20px;
// // `;

// // export async function getServerSideProps(context) {
// //   await connectToDB();
// //   const { id } = context.query;
// //   const product = await Product.findById(id);
// //   const { hi } = context.query;
// //   console.log(hi);
// //   const category = await Category.findById(product.category);
// //   return {
// //     props: {
// //       product: JSON.parse(JSON.stringify(product)),
// //       category: JSON.parse(JSON.stringify(category)),
// //     },
// //   };
// // }
