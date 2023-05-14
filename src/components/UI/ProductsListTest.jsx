import React from "react";
import ProductCardTest from "./ProductCartTest";
const ProductsListTest = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <ProductCardTest item={item} key={item.id} />
      ))}
    </>
  );
};

export default ProductsListTest;
